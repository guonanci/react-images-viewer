'use strict'

var expect = require('chai').expect;
var numFormatter = require('../index');

describe('#numFormatter', function() {
  it('should convert single digits', function() {
    var result = numFormatter(1)
    expect(result).to.equal('1');
  });
  it('should covert double digits', function() {
    var result = numFormatter(12);
    expect(result).to.equal('12');
  });
  it('should convert triple digits', function() {
    var result = numFormatter(123);
    expect(result).to.equal('123');
  });
  it('should convert 4 digits', function() {
    var result = numFormatter(1234);
    expect(result).to.equal('1,234');
  });
  it('should convert 5 digits', function() {
    var result = numFormatter(12345);
    expect(result).to.equal('12,345');
  });
});
