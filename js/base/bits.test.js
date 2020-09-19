const { s2b, b2s, bitsCount, countOnes } = require("./bits");

describe("s2b", () => {
  it("should parse binary strings", () => {
    expect(s2b("001")).toBe(1);
    expect(s2b("011")).toBe(3);
    expect(s2b("111")).toBe(7);
  });
});

describe("b2s", () => {
  it("should convert numbers to binary strings", () => {
    expect(b2s(1)).toBe("1");
    expect(b2s(2)).toBe("10");
    expect(b2s(-2)).toBe("-10");
    expect(b2s(Number.MAX_SAFE_INTEGER)).toBe("1".repeat(53));
    expect(b2s(Number.MIN_SAFE_INTEGER)).toBe("-" + "1".repeat(53));
  });

  it("should leave strings as is", () => {
    const strings = [`abc`, `a\n9`];

    strings.forEach((str) => {
      expect(b2s(str)).toBe(str);
    });
  });

  it("should stringify objects", () => {
    expect(b2s([0, 1, 2])).toBe("0,1,2");
    expect(b2s({})).toBe("[object Object]");
    expect(b2s({ toString: () => "yup" })).toBe("yup");
    expect(b2s(() => "woah")).toBe('() => "woah"');
  });
});

describe("conversions", () => {
  it("should unparse parsed numbers", () => {
    const src = [
      ["10101", 21],
      ["10", 2],
      ["111000", 56],
    ];

    src.forEach(([str, num]) => {
      expect(s2b(str)).toBe(num);
      expect(b2s(num)).toBe(str);
    });
  });
});

describe("bitwise", () => {
  it("<< should shift bits left", () => {
    expect(0b0001 << 1).toBe(0b0010);
    expect(0b0010 << 2).toBe(0b1000);
    expect(0b0011 << 1).toBe(0b0110);
    expect(0b0101 << 1).toBe(0b1010);
  });

  it(">> should shift bits right", () => {
    expect(0b1000 >> 1).toBe(0b0100);
    expect(0b1000 >> 2).toBe(0b0010);
    expect(0b0001 >> 1).toBe(0b0000);
    expect(0b1111 >> 3).toBe(0b0001);
    expect(0b1111 >> 4).toBe(0b0000);
  });

  it("should toggle bits with &", () => {
    expect(0 & 0).toBe(0);
    expect(0 & 1).toBe(0);
    expect(1 & 0).toBe(0);
    expect(1 & 1).toBe(1);
    expect(0b010 & 0b101).toBe(0b000);
    expect(0b110 & 0b101).toBe(0b100);
    expect(0b001 & 0b101).toBe(0b001);
  });

  it("should toggle bits with |", () => {
    expect(0 | 0).toBe(0);
    expect(0 | 1).toBe(1);
    expect(1 | 0).toBe(1);
    expect(1 | 1).toBe(1);
    expect(0b010 | 0b101).toBe(0b111);
    expect(0b110 | 0b101).toBe(0b111);
    expect(0b001 | 0b101).toBe(0b101);
  });

  it("should turn bits on and off with | and &", () => {
    let src = 0b0000;

    src |= 0b1000;
    expect(src).toBe(0b1000);

    src |= 0b0100;
    src |= 0b0001;
    expect(src).toBe(0b1101);

    src &= 0b0001;
    expect(src).toBe(0b0001);

    src |= 0b1111;
    src &= 0b0001;
    expect(src).toBe(0b0001);
  });

  it("should flip bits with ^", () => {
    expect(0 ^ 0).toBe(0);
    expect(0 ^ 1).toBe(1);
    expect(1 ^ 0).toBe(1);
    expect(1 ^ 1).toBe(0);
  });

  it("should toggle bits with XOR bitmask", () => {
    expect(0b0101 ^ 0b1000).toBe(0b1101);
    expect(0b0011 ^ 0b1000).toBe(0b1011);
    expect(0b0010 ^ 0b0011).toBe(0b0001);
    expect(0b0101 ^ 0b0101).toBe(0b0000);
  });

  it("should query bits with & 1", () => {
    const src = 0b0101;

    expect(src & 0b1000).toBeFalsy();
    expect(src & 0b0100).toBeTruthy();
    expect(src & 0b0010).toBeFalsy();
    expect(src & 0b0001).toBeTruthy();

    // To highlight our original number
    // is still as it's supposed to be
    expect(src).toBe(0b0101);
  });

  it("should how many bits there are in a given number", () => {
    const src = [43534438, 0, 2, 128, 45398, 234, Number.MAX_SAFE_INTEGER];

    src.forEach((num) => {
      expect(b2s(num).length).toBe(bitsCount(num));
    });
  });

  it("should only allow 53 bits in mantissa", () => {
    expect(b2s(Number.MAX_SAFE_INTEGER).length).toBe(53);
    // However, this one won't be precise anymore
    expect(b2s(Number.MAX_SAFE_INTEGER + 1).length).toBe(54);
  });

  it("should invert bits with ~", () => {
    // It also toggles the sign bit
    expect(~0b0101).toBe(-0b0110);

    // ~x === -(x + 1)
    expect(~0b1010).toBe(-(0b1010 + 1));

    expect(~0).toBe(-1);
    expect(~1).toBe(-2);
    expect(~2).toBe(-3);
  });

  it("should state if the number is odd with & 1", () => {
    expect(0 & 1).toBeFalsy();
    expect(1 & 1).toBeTruthy();
    expect(2 & 1).toBeFalsy();
    expect(3 & 1).toBeTruthy();
  });

  it("should construct operational bitmasks", () => {
    const src = 0b111000;

    // Toggle
    expect(src ^ (1 << 2)).toBe(0b111100);
    expect(src ^ (1 << 3)).toBe(0b110000);
    expect(src ^ (1 << 4)).toBe(0b101000);
    expect(src ^ (1 << 5)).toBe(0b011000);

    // Turn strictly off
    expect(src & ~(1 << 2)).toBe(0b111000);
    expect(src & ~(1 << 3)).toBe(0b110000);
    expect(src & ~(1 << 4)).toBe(0b101000);
    expect(src & ~(1 << 5)).toBe(0b011000);

    // Turn strictly on
    expect(src | (1 << 2)).toBe(0b111100);
    expect(src | (1 << 3)).toBe(0b111000);
    expect(src | (1 << 4)).toBe(0b111000);
    expect(src | (1 << 5)).toBe(0b111000);
  });

  it("should swap numbers with three XORs", () => {
    let a = 0b0011;
    let b = 0b0101;

    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    expect(a).toBe(0b0101);
    expect(b).toBe(0b0011);
  });
});

describe("countOnes", () => {
  it("should return count of '1' bits for a given number", () => {
    expect(countOnes(0b0101)).toBe(2);
    expect(countOnes(0b0100)).toBe(1);
    expect(countOnes(0b111111)).toBe(6);
    expect(countOnes(0b111101)).toBe(5);
    expect(countOnes(0b0)).toBe(0);
    expect(countOnes(-0b0)).toBe(0);
    expect(countOnes(-0b1010)).toBe(2);
    expect(countOnes(Number.MAX_SAFE_INTEGER)).toBe(32);
  });
});

describe("BigInt", () => {
  it("should allow representing big numbers", () => {
    expect(b2s(BigInt("1".repeat(256))).length).toBe(848);
  });

  it("is not strictly equal to Number", () => {
    expect(0n === 0).toBe(false);
    expect(0n == 0).toBe(true);
  });

  it("could be compared to Number as usual", () => {
    expect(120n > 64).toBe(true);
    expect(120n < 256).toBe(true);
    expect(120n <= 120).toBe(true);
    expect(120n >= 120).toBe(true);
  });

  it("could be mixed within arrays for sorting", () => {
    const arr = [4n, 5n, 3, 2, 1, 6n];
    
    // BigInt can't be used with Number for arithmetics
    expect(() => arr.sort((a, b) => a - b)).toThrow();

    // But we still can compare them
    expect(arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))).toEqual([
      1,
      2,
      3,
      4n,
      5n,
      6n,
    ]);
  });
});
