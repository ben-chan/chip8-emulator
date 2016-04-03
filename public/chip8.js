/**
 * Common utils
 */
function Utils() {
    this.pad_zero_byte = function (byte_string, expected_length) {
        if (byte_string.length < expected_length) {
            for (var i = byte_string.length; i < expected_length; ++i) {
                byte_string = "0" + byte_string;
            }
        }
        return byte_string;
    }

    this.extract_one_byte_number_from_opcode = function (opcode, index) {
        var input_number = parseInt(opcode[index], 16);
        return input_number;
    }

    this.extract_two_bytes_number_from_opcode = function (opcode) {
        var input_number = parseInt(opcode[2] + opcode[3], 16);
        return input_number;
    }

    this.extract_three_bytes_number_from_opcode = function (opcode) {
        var input_number = parseInt(opcode[1] + opcode[2] + opcode[3], 16);
        return input_number;
    }
}
var utils = new Utils();


/**
 * The graphic system, responsible for rendering the sprite on screen and other
 * graphical instructions
 */
function Graphic(chip8) {
    this.screen = chip8.screen;
    this.chip8 = chip8;
    this.WIDTH = 64;
    this.HEIGHT = 32
    this.SPRITE_ROW_DELIMITER = "|";
    this.SCREEN_SCALE_FACTOR = 10;
    this.FONT_BASE_ADDRESS = 80;
    this.FONT_BASE_START_ADDRESS = this.FONT_BASE_ADDRESS;
    this.init_buffer();
    this.init_fonts();
    this.clear_screen();
    this.FONT_HEIGHT = 5;

}
Graphic.prototype.init_buffer = function () {
    this.buffer = new Array(this.HEIGHT);
    for (var y = 0; y < this.buffer.length; ++y) {
        this.buffer[y] = new Array(this.WIDTH);
        for (var x = 0; x < this.WIDTH; ++x) {
            this.buffer[y][x] = 0;
        }
    }
}


Graphic.prototype.init_fonts = function () {
    //Zero
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //One
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 32;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 96;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 32;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 32;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 112;
    
    //Two
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //Three
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //Four
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;    
    
    //Five
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //Six
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;    
    
    //Seven
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 32;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 64;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 64;
    
    //Eight
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;    
        
    //Nine
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 16;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //A
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;    
    
    //B
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    
    //C
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //D
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 144;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    
    //E
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 240;
    
    //F
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 224;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
    this.chip8.memory[this.FONT_BASE_ADDRESS++] = 128;
}


Graphic.prototype.draw_sprite = function (x, y, sprite_in_binary) {
    var rows = sprite_in_binary.split(this.SPRITE_ROW_DELIMITER);
    this.chip8.registers["VF"] = 0;   
    
    //Fill up the graphic buffer
    for (var row_idx = 0; row_idx < rows.length; ++row_idx) {
        var row = rows[row_idx];
        //Each row is a 8 bit string (e.g 11100011)
        for (var bit_idx = 0; bit_idx < row.length; ++bit_idx) {
            var wrapped_x = bit_idx + x;
            if (wrapped_x > this.WIDTH) {
                wrapped_x %= this.WIDTH;
            }
            var wrapped_y = row_idx + y;
            if (wrapped_y > this.HEIGHT) {
                wrapped_y %= this.HEIGHT;
            }
            var buffer_pixel = this.buffer[wrapped_y][wrapped_x];
            var memory_pixel = row[bit_idx];
            if (memory_pixel == 1) {
                if (buffer_pixel == 1) {
                    this.chip8.registers["VF"] = 1;
                }
                this.buffer[wrapped_y][wrapped_x] = memory_pixel ^ buffer_pixel;
            }
        }
    }
    //Draw the screen
    for (var y_idx = 0; y_idx < this.HEIGHT; ++y_idx) {
        for (var x_idx = 0; x_idx < this.WIDTH; ++x_idx) {
            var pixel = this.buffer[y_idx][x_idx];
            var fillStyle = "black";
            if (pixel == 1) {
                fillStyle = "white";
            }
            var context = this.screen.getContext('2d');
            context.beginPath();
            context.fillStyle = fillStyle
            context.fillRect(x_idx * this.SCREEN_SCALE_FACTOR, y_idx * this.SCREEN_SCALE_FACTOR, 1 * this.SCREEN_SCALE_FACTOR, 1 * this.SCREEN_SCALE_FACTOR);
        }
    }
}

Graphic.prototype.clear_screen = function () {
    //Clear the buffer
    for (var y_idx = 0; y_idx < this.HEIGHT; ++y_idx) {
        for (var x_idx = 0; x_idx < this.WIDTH; ++x_idx) {
            this.buffer[y_idx][x_idx] = 0;
        }
    }
    //Clear the canvas
    var context = this.screen.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, this.WIDTH * this.SCREEN_SCALE_FACTOR, this.HEIGHT * this.SCREEN_SCALE_FACTOR);
}

/**
 * The keyboard
 */
function Keyboard(chip8) {
    this.chip8 = chip8

    this.KEY_1 = 49;
    this.KEY_2 = 50;
    this.KEY_3 = 51;
    this.KEY_4 = 52;

    this.KEY_Q = 81;
    this.KEY_W = 87;
    this.KEY_E = 69;
    this.KEY_R = 82;

    this.KEY_A = 65;
    this.KEY_S = 83;
    this.KEY_D = 68;
    this.KEY_F = 70

    this.KEY_Z = 90;
    this.KEY_X = 88;
    this.KEY_C = 67;
    this.KEY_V = 86;

    this.keys = [
        { key_code: this.KEY_1, is_pressed: false },
        { key_code: this.KEY_2, is_pressed: false },
        { key_code: this.KEY_3, is_pressed: false },
        { key_code: this.KEY_4, is_pressed: false },

        { key_code: this.KEY_Q, is_pressed: false },
        { key_code: this.KEY_W, is_pressed: false },
        { key_code: this.KEY_E, is_pressed: false },
        { key_code: this.KEY_R, is_pressed: false },

        { key_code: this.KEY_A, is_pressed: false },
        { key_code: this.KEY_S, is_pressed: false },
        { key_code: this.KEY_D, is_pressed: false },
        { key_code: this.KEY_F, is_pressed: false },

        { key_code: this.KEY_Z, is_pressed: false },
        { key_code: this.KEY_X, is_pressed: false },
        { key_code: this.KEY_C, is_pressed: false },
        { key_code: this.KEY_V, is_pressed: false },
    ];

    this.is_wait_for_keypress = false;
    this.is_wait_for_keypress_register = "";

    this.get_key_by_code = function (key_code) {
        for (var i = 0; i < this.keys.length; ++i) {
            var key = this.keys[i];
            if (key.key_code == key_code) {
                return key;
            }
        }
        throw "cannot find key_code " + key_code;
    }

    this.on_key_pressed = function (key_code) {
        if (!this.is_wait_for_keypress) {
            var key = this.get_key_by_code(key_code);
            key.is_pressed = true;
        } else {
            for (var i = 0; i < this.keys.length; ++i) {
                var key = this.keys[i];
                if (key.key_code == key_code) {
                    this.chip8.registers[this.is_wait_for_keypress_register] = i;
                }
            }
            this.is_wait_for_keypress = false;
            this.is_wait_for_keypress_register = "";
        }
    }

    this.on_key_released = function (key_code) {
        var key = this.get_key_by_code(key_code);
        key.is_pressed = false;
    }

    this.is_key_pressed = function (key_index) {
        var key = this.keys[key_index];
        return key.is_pressed;
    }

    this.wait_for_keypress = function (register_index) {
        this.is_wait_for_keypress = true;
        this.is_wait_for_keypress_register = "V" + register_index;
    }
}

/**
 * Models the Chip8
 */
function Chip8(screen) {
    this.screen=screen;
    this.OPCODE_BYTE_SIZE = 2;
    this.START_ADDRESS = 512;//0x200 start address
    this.MEMORY_SIZE = 4096;
    this.STACK_SIZE = 16;
    this.CPU_CYCLE_PER_SECOND = 60;
    this.MAX_VALUE = 255;
    this.delay_in_ms = 1000 / this.CPU_CYCLE_PER_SECOND;    
    this.reset(this.screen);
}

Chip8.prototype.reset = function (screen) {
    this.memory = new Array(this.MEMORY_SIZE);
    this.stack = new Array(this.STACK_SIZE);
    this.registers = new Array();    
    this.registers["V0"] = 0;
    this.registers["V1"] = 0;
    this.registers["V2"] = 0;

    this.registers["V3"] = 0;
    this.registers["V4"] = 0;
    this.registers["V5"] = 0;

    this.registers["V6"] = 0;
    this.registers["V7"] = 0;
    this.registers["V8"] = 0;

    this.registers["V9"] = 0;
    this.registers["VA"] = 0;
    this.registers["VB"] = 0;

    this.registers["VC"] = 0;
    this.registers["VD"] = 0;
    this.registers["VE"] = 0;
    this.registers["VF"] = 0;
    this.stack_pointer = 0;    
    
    //the "I" register
    this.memory_register = "";
    this.delay_timer = "";
    this.sound_timer = ""; 
    this.program_counter = this.START_ADDRESS;
    this.graphic = new Graphic(this);
    this.keyboard = new Keyboard(this);
    
}

Chip8.prototype.load_rom_to_memory = function (rom_content) {
    for (var i = 0; i < rom_content.byteLength; i++) {
        this.memory[i + this.START_ADDRESS] = rom_content[i];
    }
}

Chip8.prototype.start_emulate = function (rom_content,speed) {
    this.reset(this.screen);
    this.load_rom_to_memory(rom_content);
    var chip8 = this;
    var timer = setInterval(function () {
        for (var i = 0; i < speed; ++i) {
            if (chip8.keyboard.is_wait_for_keypress) {
                break;
            }
            if (chip8.program_counter >= rom_content.length + chip8.START_ADDRESS) {
                clearInterval(timer);
                return;
            }
            var first_byte = chip8.memory[chip8.program_counter++].toString(16).toUpperCase();
            first_byte = utils.pad_zero_byte(first_byte, 2);

            var second_byte = chip8.memory[chip8.program_counter++].toString(16).toUpperCase();
            second_byte = utils.pad_zero_byte(second_byte, 2);
            var opcode = first_byte + second_byte;

            chip8.execute_instruction(opcode);
        }
        if (chip8.delay_timer > 0) {
            --chip8.delay_timer;
        }
    }, this.delay_in_ms);
}


Chip8.prototype.execute_instruction = function (opcode) {
    var operation = new Operation(opcode);
    try {
        operation.execute(this);
    } catch (e) {
        console.log(e);
    }
}

Chip8.prototype.on_key_pressed = function (key_code) {
    this.keyboard.on_key_pressed(key_code);
}

Chip8.prototype.on_key_released = function (key_code) {
    this.keyboard.on_key_released(key_code);
}

Chip8.prototype.skip_next_instruction = function () {
    this.program_counter += this.OPCODE_BYTE_SIZE
}


/**
 * Opcode mapping and their corresponding CPU operations
 */
function Operation(current_opcode) {
    this.current_opcode = current_opcode;
    this.opcodes = new Array();
    this.opcodes["00E0"] = this.clear_screen;
    this.opcodes["00EE"] = this.return_from_subroutine;
    this.opcodes["1"] = this.jump_to_address;
    this.opcodes["2"] = this.call_subroutine;
    this.opcodes["3"] = this.skip_to_next_ifequal;
    this.opcodes["4"] = this.skip_to_next_ifnotequal;
    this.opcodes["5"] = this.skip_to_next_ifequal_register;
    this.opcodes["6"] = this.set_register_value;
    this.opcodes["7"] = this.add_register_value;
    this.opcodes["8"] = this.call_8_opcode_group;
    this.opcodes["9"] = this.skip_to_next_ifnotequal_register;
    this.opcodes["A"] = this.set_address_register;
    this.opcodes["B"] = this.jump_to_address_plus_v0;
    this.opcodes["C"] = this.set_address_register_with_random;
    this.opcodes["D"] = this.draw_sprite;
    this.opcodes["F"] = this.call_f_opcode_group;
    this.opcodes["E"] = this.call_e_opcode_group;
}

Operation.prototype.call_subroutine = function (chip8) {   
    //Push the program counter to the stack 
    chip8.stack[chip8.stack_pointer++] = chip8.program_counter;
    chip8.program_counter = utils.extract_three_bytes_number_from_opcode(this.current_opcode);
}

Operation.prototype.return_from_subroutine = function (chip8) {
    chip8.program_counter = chip8.stack[--chip8.stack_pointer];
}

Operation.prototype.set_address_register_with_random = function (chip8) {
    var register_index = this.current_opcode[1];
    var input_number = utils.extract_two_bytes_number_from_opcode(this.current_opcode);
    var min = 1;
    var max = 255;
    var random_number = Math.floor(Math.random() * (max - min + 1)) + min;
    chip8.registers["V" + register_index] = random_number & input_number;
}

Operation.prototype.call_8_opcode_group = function (chip8) {
    var sub_opcode = this.current_opcode[3];
    var target_register_index = this.current_opcode[1];
    var source_register_index = this.current_opcode[2];
    if ("0" == sub_opcode) {
        chip8.registers["V" + target_register_index] = chip8.registers["V" + source_register_index];
        return;
    }
    if ("1" == sub_opcode) {
        chip8.registers["V" + target_register_index] |= chip8.registers["V" + source_register_index];
        return;
    }
    if ("2" == sub_opcode) {
        chip8.registers["V" + target_register_index] &= chip8.registers["V" + source_register_index];
        return;
    }
    if ("3" == sub_opcode) {
        chip8.registers["V" + target_register_index] ^= chip8.registers["V" + source_register_index];
        return;
    }
    if ("4" == sub_opcode) {
        chip8.registers["V" + target_register_index] += chip8.registers["V" + source_register_index];
        chip8.registers["VF"] = 0;
        if (chip8.registers["V" + target_register_index] > chip8.MAX_VALUE) {
            chip8.registers["VF"] = 1;
            chip8.registers["V" + target_register_index] -= (chip8.MAX_VALUE + 1);
        }
        return;
    }

    if ("5" == sub_opcode) {
        chip8.registers["VF"] = 0;
        if (chip8.registers["V" + target_register_index] > chip8.registers["V" + source_register_index]) {
            chip8.registers["VF"] = 1;
        }
        chip8.registers["V" + target_register_index] -= chip8.registers["V" + source_register_index];
        if (chip8.registers["V" + target_register_index] < 0) {
            chip8.registers["V" + target_register_index] += (chip8.MAX_VALUE);
        }
        return;
    }

    if ("6" == sub_opcode) {
        var new_value = chip8.registers["V" + target_register_index] >> 1;
        var binary_value = chip8.registers["V" + target_register_index].toString(2);
        chip8.registers["VF"] = parseInt(binary_value.substring(0, 1));
        chip8.registers["V" + target_register_index] = new_value;
        return;
    }

    if ("7" == sub_opcode) {
        chip8.registers["VF"] = 0;
        if (chip8.registers["V" + source_register_index] > chip8.registers["V" + target_register_index]) {
            chip8.registers["VF"] = 1;
        }
        chip8.registers["V" + target_register_index] = chip8.registers["V" + source_register_index] - chip8.registers["V" + target_register_index];
        if (chip8.registers["V" + target_register_index] < 0) {
            chip8.registers["V" + target_register_index] += (chip8.MAX_VALUE);
        }
        return;
    }

    if ("E" == sub_opcode) {
        var new_value = chip8.registers["V" + target_register_index] << 1;
        var binary_value = chip8.registers["V" + target_register_index].toString(2);
        chip8.registers["VF"] = parseInt(binary_value.substr(binary_value.length - 1));
        chip8.registers["V" + target_register_index] = new_value;
        return;
    }

    throw "unhandled opcode=" + this.current_opcode;
}

Operation.prototype.call_f_opcode_group = function (chip8) {
    var sub_opcode = this.current_opcode[2] + this.current_opcode[3];
    var register_index = this.current_opcode[1];
    if ("07" == sub_opcode) {
        chip8.registers["V" + register_index] = chip8.delay_timer;
        return;
    }

    if ("0A" == sub_opcode) {
        chip8.keyboard.wait_for_keypress(register_index);
        return;
    }

    if ("15" == sub_opcode) {
        chip8.delay_timer = chip8.registers["V" + register_index];
        return;
    }

    if ("18" == sub_opcode) {
        chip8.sound_timer = chip8.registers["V" + register_index];
        return;
    }

    if ("1E" == sub_opcode) {
        chip8.registers["VF"] = 0;
        chip8.memory_register += chip8.registers["V" + register_index];
        if (chip8.memory_register > 4095) {
            chip8.registers["VF"] = 1;
        }
        return;
    }


    if ("29" == sub_opcode) {
        var char = chip8.registers["V" + register_index];
        var address_offset = char * chip8.graphic.FONT_HEIGHT;
        var font_start_address = address_offset + chip8.graphic.FONT_BASE_START_ADDRESS;
        chip8.memory_register = font_start_address;
        return;
    }

    if ("33" == sub_opcode) {
        chip8.memory[chip8.memory_register] = Math.round(chip8.registers["V" + register_index] / 100);
        chip8.memory[chip8.memory_register + 1] = Math.round((chip8.registers["V" + register_index] / 10) % 10);
        chip8.memory[chip8.memory_register + 2] = Math.round(chip8.registers["V" + register_index] % 10);
        return;
    }

    if ("55" == sub_opcode) {
        for (var i = 0; i <= parseInt(register_index, 10); ++i) {
            var register_index_hex = i.toString(16).toUpperCase();
            chip8.memory[chip8.memory_register + i] = chip8.registers["V" + register_index_hex];
        }
        return;
    }

    if ("65" == sub_opcode) {
        for (var i = 0; i <= parseInt(register_index, 10); ++i) {
            var register_index_hex = i.toString(16).toUpperCase();
            chip8.registers["V" + register_index_hex] = chip8.memory[chip8.memory_register + i];
        }
        return;
    }
    throw "unhandled opcode=" + this.current_opcode;
}


Operation.prototype.call_e_opcode_group = function (chip8) {
    var sub_opcode = this.current_opcode[2] + this.current_opcode[3];
    if ("A1" == sub_opcode) {
        var register_index = this.current_opcode[1];
        var key = chip8.registers["V" + register_index];
        if (!chip8.keyboard.is_key_pressed(key)) {
            chip8.skip_next_instruction();

        }
        return;
    }
    if ("9E" == sub_opcode) {
        var register_index = this.current_opcode[1];
        var key = chip8.registers["V" + register_index];
        if (chip8.keyboard.is_key_pressed(key)) {
            chip8.skip_next_instruction();
        }
        return;
    }
    throw "unhandled opcode=" + this.current_opcode;
}

Operation.prototype.skip_to_next_ifequal = function (chip8) {
    var register_index = this.current_opcode[1];
    var input_number = utils.extract_two_bytes_number_from_opcode(this.current_opcode);
    if (chip8.registers["V" + register_index] == input_number) {
        chip8.skip_next_instruction();
    }
}

Operation.prototype.skip_to_next_ifnotequal = function (chip8) {
    var register_index = this.current_opcode[1];
    var input_number = utils.extract_two_bytes_number_from_opcode(this.current_opcode);
    if (chip8.registers["V" + register_index] != input_number) {
        chip8.skip_next_instruction();
    }
}

Operation.prototype.skip_to_next_ifequal_register = function (chip8) {
    var target_register_index = this.current_opcode[1];
    var source_register_index = this.current_opcode[2];
    if (chip8.registers["V" + target_register_index] == chip8.registers["V" + source_register_index]) {
        chip8.skip_next_instruction();
    }
}

Operation.prototype.skip_to_next_ifnotequal_register = function (chip8) {
    var target_register_index = this.current_opcode[1];
    var source_register_index = this.current_opcode[2];
    if (chip8.registers["V" + target_register_index] != chip8.registers["V" + source_register_index]) {
        chip8.skip_next_instruction();
    }
}

Operation.prototype.execute = function (chip8) {
    var action = this.opcodes[this.current_opcode];
    if (!action) {
        //No exact match, try prefix searxh
        var opcode_prefix = this.current_opcode[0];
        action = this.opcodes[opcode_prefix];
    }
    action.call(this, chip8);
    return;
}

Operation.prototype.clear_screen = function (chip8) {
    chip8.graphic.clear_screen(chip8);
};



Operation.prototype.set_address_register = function (chip8) {
    chip8.memory_register = utils.extract_three_bytes_number_from_opcode(this.current_opcode);
}

Operation.prototype.jump_to_address = function (chip8) {
    var target_address = parseInt(this.current_opcode[1] + this.current_opcode[2] + this.current_opcode[3], 16);
    chip8.program_counter = target_address;
}

Operation.prototype.jump_to_address_plus_v0 = function (chip8) {
    var target_address = parseInt(this.current_opcode[1] + this.current_opcode[2] + this.current_opcode[3], 16);
    chip8.program_counter = (target_address + chip8.registers["V0"]);
}

Operation.prototype.set_register_value = function (chip8) {
    var register_index = this.current_opcode[1];
    var input_number = utils.extract_two_bytes_number_from_opcode(this.current_opcode);
    chip8.registers["V" + register_index] = input_number;
}

Operation.prototype.add_register_value = function (chip8) {
    var register_index = this.current_opcode[1];
    var input_number = utils.extract_two_bytes_number_from_opcode(this.current_opcode);
    chip8.registers["V" + register_index] += input_number;
    if (chip8.registers["V" + register_index] > chip8.MAX_VALUE) {
        chip8.registers["V" + register_index] -= (chip8.MAX_VALUE + 1);
    }
}


Operation.prototype.draw_sprite = function (chip8) {
    var x_register_index = this.current_opcode[1];
    var y_register_index = this.current_opcode[2];
    var x = chip8.registers["V" + x_register_index];
    var y = chip8.registers["V" + y_register_index];
    var rows_to_draw = utils.extract_one_byte_number_from_opcode(this.current_opcode, 3);
    var sprite_in_binary = "";
    for (var i = 0; i < rows_to_draw; ++i) {
        var row = chip8.memory[chip8.memory_register + i].toString(2);
        sprite_in_binary += utils.pad_zero_byte(row, 8) + chip8.graphic.SPRITE_ROW_DELIMITER;
    }
    sprite_in_binary = sprite_in_binary.substring(0, sprite_in_binary.length - 1);
    //Delegate the draw action to the graphic system, the chip is just responsible for
    //retrieve the sprite information.
    chip8.graphic.draw_sprite(x, y, sprite_in_binary);
}

