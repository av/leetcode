const { s2b, b2s, bitsCount } = require("./bits");

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

  it("should toggle bits with bitmask", () => {
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
});
