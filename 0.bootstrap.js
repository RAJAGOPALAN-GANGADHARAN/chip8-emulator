(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/chip8_emulator.js":
/*!********************************!*\
  !*** ../pkg/chip8_emulator.js ***!
  \********************************/
/*! exports provided: CHIP8, __wbg_log_e2f98e71d3c23a52, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chip8_emulator_bg.wasm */ \"../pkg/chip8_emulator_bg.wasm\");\n/* harmony import */ var _chip8_emulator_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chip8_emulator_bg.js */ \"../pkg/chip8_emulator_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CHIP8\", function() { return _chip8_emulator_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"CHIP8\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_log_e2f98e71d3c23a52\", function() { return _chip8_emulator_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_log_e2f98e71d3c23a52\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _chip8_emulator_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/chip8_emulator.js?");

/***/ }),

/***/ "../pkg/chip8_emulator_bg.js":
/*!***********************************!*\
  !*** ../pkg/chip8_emulator_bg.js ***!
  \***********************************/
/*! exports provided: CHIP8, __wbg_log_e2f98e71d3c23a52, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHIP8\", function() { return CHIP8; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_log_e2f98e71d3c23a52\", function() { return __wbg_log_e2f98e71d3c23a52; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chip8_emulator_bg.wasm */ \"../pkg/chip8_emulator_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n/**\n*/\nclass CHIP8 {\n\n    static __wrap(ptr) {\n        const obj = Object.create(CHIP8.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_chip8_free\"](ptr);\n    }\n    /**\n    * @returns {CHIP8}\n    */\n    static new() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_new\"]();\n        return CHIP8.__wrap(ret);\n    }\n    /**\n    */\n    load_fonts() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_load_fonts\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get_width() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_width\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_height() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_height\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_dirty_paint() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_dirty_paint\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_dirty_size() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_dirty_size\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_block_signal() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_block_signal\"](this.ptr);\n        return ret;\n    }\n    /**\n    */\n    toggle_block_signal() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_toggle_block_signal\"](this.ptr);\n    }\n    /**\n    */\n    post_cycle() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_post_cycle\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get_key_buffer_pointer() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_key_buffer_pointer\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {boolean}\n    */\n    should_draw() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_should_draw\"](this.ptr);\n        return ret !== 0;\n    }\n    /**\n    */\n    draw_completed() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_draw_completed\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get_pc() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_pc\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    start_address() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_start_address\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_memory_pointer() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_memory_pointer\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_graphics_pointer() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_graphics_pointer\"](this.ptr);\n        return ret;\n    }\n    /**\n    */\n    fetch_instruction() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_fetch_instruction\"](this.ptr);\n    }\n    /**\n    */\n    move_pc() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_move_pc\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get_opcode() {\n        var ret = _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_get_opcode\"](this.ptr);\n        return ret;\n    }\n    /**\n    */\n    decode_instruction() {\n        _chip8_emulator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"chip8_decode_instruction\"](this.ptr);\n    }\n}\n\nfunction __wbg_log_e2f98e71d3c23a52(arg0, arg1) {\n    console.log(getStringFromWasm0(arg0, arg1));\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../server/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/chip8_emulator_bg.js?");

/***/ }),

/***/ "../pkg/chip8_emulator_bg.wasm":
/*!*************************************!*\
  !*** ../pkg/chip8_emulator_bg.wasm ***!
  \*************************************/
/*! exports provided: memory, __wbg_chip8_free, chip8_new, chip8_load_fonts, chip8_get_width, chip8_get_height, chip8_get_dirty_paint, chip8_get_dirty_size, chip8_get_block_signal, chip8_toggle_block_signal, chip8_post_cycle, chip8_get_key_buffer_pointer, chip8_should_draw, chip8_draw_completed, chip8_get_pc, chip8_start_address, chip8_get_memory_pointer, chip8_get_graphics_pointer, chip8_fetch_instruction, chip8_move_pc, chip8_get_opcode, chip8_decode_instruction */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./chip8_emulator_bg.js */ \"../pkg/chip8_emulator_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/chip8_emulator_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chip8_emulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chip8_emulator */ \"../pkg/chip8_emulator.js\");\n/* harmony import */ var chip8_emulator_chip8_emulator_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chip8_emulator/chip8_emulator_bg */ \"../pkg/chip8_emulator_bg.wasm\");\n\n\n\n\nconst chip = chip8_emulator__WEBPACK_IMPORTED_MODULE_0__[\"CHIP8\"].new();\nconst START_ADDRESS = chip.start_address();\nconst CELL_SIZE =20;\n\nconst height = chip.get_height();\nconst width = chip.get_width();\n\nconst gfx = new Array(height * width).fill(0);\n\nlet inverseKeyMapping = {\n\t48:0x0,\n\t49:0x1,\n\t50:0x2,\n\t51:0x3,\n\t52:0x4,\n\t53:0x5,\n\t54:0x6,\n\t55:0x7,\n\t56:0x8,\n\t57:0x9,\n\t65:0xA,\n\t66:0xB,\n\t67:0xC,\n\t68:0xD,\n\t69:0xE,\n\t70:0xF,\n};\n\nconst prepareCanvas = () => {\n\tconst canvas = document.getElementById(\"chip8-canvas\");\n\tcanvas.height = (CELL_SIZE + 1) * height + 1;\n\tcanvas.width = (CELL_SIZE + 1) * width + 1;\n\t\n\treturn canvas.getContext('2d');\n}\nconst fillCanvas = () => {\n\tctx.beginPath();\n\n\tfor (let row = 0; row < height; row++) {\n\t\tfor (let col = 0; col < width; col++)\n\t\t{\n\t\t\tconst idx = getIndex(row, col);\n\t\t\t\n\t\t\tctx.fillStyle = \"#000000\";\n\t\t\t\n\t\t\tctx.fillRect(\n\t\t\tcol * (CELL_SIZE) +1,\n\t\t\trow * (CELL_SIZE)+1,\n\t\t\tCELL_SIZE,\n\t\t\tCELL_SIZE\n\t\t\t);\n\t\t}\n\t}\n\n\tctx.stroke();\n}\n\nconst _loadCallback = () => {\n\tfillCanvas();\n\trequestAnimationFrame(renderLoop);\n}\nconst loadRom = async () => {\n\tawait fetch('roms/pong.rom')\n\t.then(i => i.arrayBuffer())\n\t\t.then(buffer => {\n\t\t\tconst rom = new DataView(buffer, 0, buffer.byteLength);\n\t\t\tlet programMemoryPointer = chip.get_memory_pointer();\n\t\t\tlet programMemory = new Uint8Array(chip8_emulator_chip8_emulator_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, programMemoryPointer, 4096);\n\t\t\tfor (let i = 0; i < rom.byteLength; i++) {\n\t\t\t\tprogramMemory[START_ADDRESS + i] = rom.getUint8(i);\n\t\t\t}\n\n\t\t\t_loadCallback();\n\t\t});\n}\n\nconst getIndex = (row, column) => {\n\treturn row * width + column;\n};\n\n\n\nconst drawCells = () => {\n\n\tconst cellsPtr = chip.get_dirty_paint();\n\tconst cells = new Uint16Array(chip8_emulator_chip8_emulator_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, cellsPtr, chip.get_dirty_size());\n\n\tctx.beginPath();\n\n\tfor (var ind of cells) {\n\t\tlet row = Math.floor(ind / width);\n\t\tlet col = ind % width;\n\n\t\tgfx[ind] = 1 - gfx[ind];\n\t\tctx.fillStyle = (gfx[ind] != 0) ? \"#FFFFFF\" : \"#000000\";\n\t\t\n\t\tctx.fillRect(\n\t\tcol * (CELL_SIZE) +1,\n\t\trow * (CELL_SIZE)+1,\n\t\tCELL_SIZE,\n\t\tCELL_SIZE\n\t\t);\n\t}\n\n\tctx.stroke();\n};\n\nconst keyboardDownEvent = (event) => {\n\tvar code = event.keyCode;\n\tif (inverseKeyMapping[code]) {\n\t\tconst keyBufferPtr = chip.get_key_buffer_pointer();\n\t\tconst keyBuffer = new Uint8Array(chip8_emulator_chip8_emulator_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, keyBufferPtr, 16);\n\t\tkeyBuffer[inverseKeyMapping[code]] = 1;\n\t\tif (chip.get_block_signal())\n\t\t\tchip.toggle_block_signal();\n\t}\n}\n\nconst keyboardUpEvent = (event) => {\n\tvar code = event.keyCode;\n\tif (inverseKeyMapping[code]) {\n\t\tconst keyBufferPtr = chip.get_key_buffer_pointer();\n\t\tconst keyBuffer = new Uint8Array(chip8_emulator_chip8_emulator_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, keyBufferPtr, 16);\n\t\tkeyBuffer[inverseKeyMapping[code]] = 0;\n\t}\n}\nconst initialize = () => {\n\tchip.load_fonts();\n\twindow.addEventListener(\"keydown\", keyboardDownEvent);\n\twindow.addEventListener(\"keyup\", keyboardUpEvent);\n\tloadRom();\n}\n\n\nconst renderLoop = () => {\n\tfor (var i = 0; i < 15; ++i) {\n\t\tchip.fetch_instruction();\n\t\tchip.decode_instruction();\n\t}\n\twhile (chip.get_block_signal()==1) { }\n\tchip.post_cycle();\n\tif (chip.should_draw()) {\n\t\tdrawCells();\n\t\tchip.draw_completed();\n\t}\n\trequestAnimationFrame(renderLoop);\n};\n\nconst ctx = prepareCanvas();\ninitialize();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);