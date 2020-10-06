'use strict'

var vmCall = require('../vmCall')
var remixLib = require('@remix-project/remix-lib')

var TraceManager = require('../../../src/trace/traceManager')
var CodeManager = require('../../../src/code/codeManager')

var traceHelper = require('../../../src/trace/traceHelper')
var SolidityProxy = require('../../../src/solidity-decoder/solidityProxy')
var InternalCallTree = require('../../../src/solidity-decoder/internalCallTree')
var EventManager = require('../../../src/eventManager')
var helper = require('./helper')

module.exports = function (st, vm, privateKey, contractBytecode, compilationResult, cb) {
  vmCall.sendTx(vm, {nonce: 0, privateKey: privateKey}, null, 0, contractBytecode, function (error, txHash) {
    if (error) {
      st.fail(error)
    } else {
      vm.web3.eth.getTransaction(txHash, function (error, tx) {
        if (error) {
          st.fail(error)
        } else {
          tx.to = traceHelper.contractCreationToken('0')
          var traceManager = new TraceManager({web3: vm.web3})
          var codeManager = new CodeManager(traceManager)
          codeManager.clear()
          var solidityProxy = new SolidityProxy(traceManager, codeManager)
          solidityProxy.reset(compilationResult)
          var debuggerEvent = new EventManager()
          var callTree = new InternalCallTree(debuggerEvent, traceManager, solidityProxy, codeManager, { includeLocalVariables: true })
          callTree.event.register('callTreeBuildFailed', (error) => {
            st.fail(error)
          })
          callTree.event.register('callTreeNotReady', (reason) => {
            st.fail(reason)
          })
          callTree.event.register('callTreeReady', (scopes, scopeStarts) => {
            try {
              let functions1 = callTree.retrieveFunctionsStack(102)
              let functions2 = callTree.retrieveFunctionsStack(115)
              let functions3 = callTree.retrieveFunctionsStack(13)

              st.equals(functions1.length, 1)
              st.equals(functions2.length, 2)
              st.equals(functions3.length, 0)
              st.equals(Object.keys(functions1[0])[0], 'functionDefinition')
              st.equals(Object.keys(functions1[0])[1], 'inputs')
              st.equals(functions1[0].inputs[0], 'foo')
              st.equals(Object.keys(functions2[0])[0], 'functionDefinition')
              st.equals(Object.keys(functions2[0])[1], 'inputs')
              st.equals(Object.keys(functions2[1])[0], 'functionDefinition')
              st.equals(Object.keys(functions2[1])[1], 'inputs')
              st.equals(functions2[0].inputs[0], 'asd')
              st.equals(functions2[1].inputs[0], 'foo')

              st.equals(functions1[0].functionDefinition.name, 'level11')
              st.equals(functions2[0].functionDefinition.name, 'level12')
              st.equals(functions2[1].functionDefinition.name, 'level11')

              st.equals(scopeStarts[0], '')
              st.equals(scopeStarts[13], '1')
              st.equals(scopeStarts[102], '2')
              st.equals(scopeStarts[115], '2.1')
              st.equals(scopeStarts[136], '3')
              st.equals(scopeStarts[153], '4')
              st.equals(scopeStarts[166], '4.1')
              st.equals(scopes[''].locals['ui8'].type.typeName, 'uint8')
              st.equals(scopes[''].locals['ui16'].type.typeName, 'uint16')
              st.equals(scopes[''].locals['ui32'].type.typeName, 'uint32')
              st.equals(scopes[''].locals['ui64'].type.typeName, 'uint64')
              st.equals(scopes[''].locals['ui128'].type.typeName, 'uint128')
              st.equals(scopes[''].locals['ui256'].type.typeName, 'uint256')
              st.equals(scopes[''].locals['ui'].type.typeName, 'uint256')
              st.equals(scopes[''].locals['i8'].type.typeName, 'int8')
              st.equals(scopes[''].locals['i16'].type.typeName, 'int16')
              st.equals(scopes[''].locals['i32'].type.typeName, 'int32')
              st.equals(scopes[''].locals['i64'].type.typeName, 'int64')
              st.equals(scopes[''].locals['i128'].type.typeName, 'int128')
              st.equals(scopes[''].locals['i256'].type.typeName, 'int256')
              st.equals(scopes[''].locals['i'].type.typeName, 'int256')
              st.equals(scopes[''].locals['ishrink'].type.typeName, 'int32')
              st.equals(scopes['2'].locals['ui8'].type.typeName, 'uint8')
              st.equals(scopes['2.1'].locals['ui81'].type.typeName, 'uint8')
              st.equals(scopes['3'].locals['ui81'].type.typeName, 'uint8')
              st.equals(scopes['4'].locals['ui8'].type.typeName, 'uint8')
              st.equals(scopes['4.1'].locals['ui81'].type.typeName, 'uint8')
            } catch (e) {
              st.fail(e.message)
            }

            helper.decodeLocals(st, 95, traceManager, callTree, function (locals) {
              st.equals(Object.keys(locals).length, 16)
              st.equals(locals['ui8'].value, '130')
              st.equals(locals['ui16'].value, '456')
              st.equals(locals['ui32'].value, '4356')
              st.equals(locals['ui64'].value, '3543543543')
              st.equals(locals['ui128'].value, '234567')
              st.equals(locals['ui256'].value, '115792089237316195423570985008687907853269984665640564039457584007880697216513')
              st.equals(locals['ui'].value, '123545666')
              st.equals(locals['i8'].value, '-45')
              st.equals(locals['i16'].value, '-1234')
              st.equals(locals['i32'].value, '3455')
              st.equals(locals['i64'].value, '-35566')
              st.equals(locals['i128'].value, '-444444')
              st.equals(locals['i256'].value, '3434343')
              st.equals(locals['i'].value, '-32432423423')
              st.equals(locals['ishrink'].value, '2')
            })

            helper.decodeLocals(st, 106, traceManager, callTree, function (locals) {
              try {
                st.equals(locals['ui8'].value, '123')
                st.equals(Object.keys(locals).length, 2)
              } catch (e) {
                st.fail(e.message)
              }
              cb()
            })
          })
          traceManager.resolveTrace(tx).then(() => {
            debuggerEvent.trigger('newTraceLoaded', [traceManager.trace])
          }).catch((error) => {
            st.fail(error)
          })
        }
      })
    }
  })
}

