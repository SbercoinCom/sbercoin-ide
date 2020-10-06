import { Node } from '../../src/'
let node: Node;

node = { "legacyAST": { "children": [{ "attributes": { "literals": ["solidity", ">=", "0.5", ".0", "<", "0.6", ".0"] }, "id": 1, "name": "PragmaDirective", "src": "0:31:0" }, { "attributes": { "SourceUnit": 53, "absolutePath": "mortal.sol", "file": "mortal.sol", "scope": 26, "symbolAliases": [null], "unitAlias": "" }, "id": 2, "name": "ImportDirective", "src": "32:20:0" }, { "attributes": { "contractDependencies": [52], "contractKind": "contract", "documentation": null, "fullyImplemented": true, "linearizedBaseContracts": [25, 52], "name": "Greeter", "scope": 26 }, "children": [{ "attributes": { "arguments": null }, "children": [{ "attributes": { "contractScope": null, "name": "Mortal", "referencedDeclaration": 52, "type": "contract Mortal" }, "id": 3, "name": "UserDefinedTypeName", "src": "74:6:0" }], "id": 4, "name": "InheritanceSpecifier", "src": "74:6:0" }, { "attributes": { "constant": false, "name": "greeting", "scope": 25, "stateVariable": true, "storageLocation": "default", "type": "string", "value": null, "visibility": "internal" }, "children": [{ "attributes": { "name": "string", "type": "string" }, "id": 5, "name": "ElementaryTypeName", "src": "141:6:0" }], "id": 6, "name": "VariableDeclaration", "src": "141:15:0" }, { "attributes": { "documentation": null, "implemented": true, "isConstructor": true, "kind": "constructor", "modifiers": [null], "name": "", "scope": 25, "stateMutability": "nonpayable", "superFunction": null, "visibility": "public" }, "children": [{ "children": [{ "attributes": { "constant": false, "name": "_greeting", "scope": 16, "stateVariable": false, "storageLocation": "memory", "type": "string", "value": null, "visibility": "internal" }, "children": [{ "attributes": { "name": "string", "type": "string" }, "id": 7, "name": "ElementaryTypeName", "src": "225:6:0" }], "id": 8, "name": "VariableDeclaration", "src": "225:23:0" }], "id": 9, "name": "ParameterList", "src": "224:25:0" }, { "attributes": { "parameters": [null] }, "children": [], "id": 10, "name": "ParameterList", "src": "257:0:0" }, { "children": [{ "children": [{ "attributes": { "argumentTypes": null, "isConstant": false, "isLValue": false, "isPure": false, "lValueRequested": false, "operator": "=", "type": "string storage ref" }, "children": [{ "attributes": { "argumentTypes": null, "overloadedDeclarations": [null], "referencedDeclaration": 6, "type": "string storage ref", "value": "greeting" }, "id": 11, "name": "Identifier", "src": "267:8:0" }, { "attributes": { "argumentTypes": null, "overloadedDeclarations": [null], "referencedDeclaration": 8, "type": "string memory", "value": "_greeting" }, "id": 12, "name": "Identifier", "src": "278:9:0" }], "id": 13, "name": "Assignment", "src": "267:20:0" }], "id": 14, "name": "ExpressionStatement", "src": "267:20:0" }], "id": 15, "name": "Block", "src": "257:37:0" }], "id": 16, "name": "FunctionDefinition", "src": "213:81:0" }, { "attributes": { "documentation": null, "implemented": true, "isConstructor": false, "kind": "function", "modifiers": [null], "name": "greet", "scope": 25, "stateMutability": "view", "superFunction": null, "visibility": "public" }, "children": [{ "attributes": { "parameters": [null] }, "children": [], "id": 17, "name": "ParameterList", "src": "338:2:0" }, { "children": [{ "attributes": { "constant": false, "name": "", "scope": 24, "stateVariable": false, "storageLocation": "memory", "type": "string", "value": null, "visibility": "internal" }, "children": [{ "attributes": { "name": "string", "type": "string" }, "id": 18, "name": "ElementaryTypeName", "src": "362:6:0" }], "id": 19, "name": "VariableDeclaration", "src": "362:13:0" }], "id": 20, "name": "ParameterList", "src": "361:15:0" }, { "children": [{ "attributes": { "functionReturnParameters": 20 }, "children": [{ "attributes": { "argumentTypes": null, "overloadedDeclarations": [null], "referencedDeclaration": 6, "type": "string storage ref", "value": "greeting" }, "id": 21, "name": "Identifier", "src": "394:8:0" }], "id": 22, "name": "Return", "src": "387:15:0" }], "id": 23, "name": "Block", "src": "377:32:0" }], "id": 24, "name": "FunctionDefinition", "src": "324:85:0" }], "id": 25, "name": "ContractDefinition", "src": "54:357:0" }], "name": "SourceUnit", "attributes": { "absolutePath": "greeter.sol", "exportedSymbols": { "Greeter": [25] } }, "id": 26, "src": "0:412:0" } }

node.source = `contract test {
    int x;

    int y;

    function set(int _x) returns (int _r)
    {
        x = _x;
        y = 10;
        _r = x;
    }

    function get() returns (uint x, uint y)
    {

    }
}`

export default node;
