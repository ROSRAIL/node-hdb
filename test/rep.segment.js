// Copyright 2013 SAP AG.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
'use strict';
/* jshint expr: true */

var lib = require('./hdb').lib;
var SegmentKind = lib.common.SegmentKind;
var FunctionCode = lib.common.FunctionCode;
var Segment = lib.reply.Segment;

describe('Rep', function () {

  describe('#Segment', function () {

    var data = new Buffer(
      '180000000000000000000100000000000000000000000000', 'hex');

    it('should create a new Segment', function () {
      var segment = new Segment();
      segment.kind.should.equal(SegmentKind.INVALID);
      segment.functionCode.should.equal(FunctionCode.NIL);
      segment.parts.should.have.length(0);
    });

    it('should write a Segment to buffer', function () {
      var segment = new Segment();
      segment.toBuffer(0).should.eql(data);
    });

    it('should inspect a  Segment', function () {
      var segment = new Segment();
      segment.inspect().should.equal([
        '{',
        '  kind: SegmentKind.INVALID,',
        '  functionCode: FunctionCode.NIL,',
        '  parts: [',
        '',
        '  ]',
        '}\n'
      ].join('\n'));
    });

    it('should get a part', function () {
      var segment = new Segment();
      (!segment.getPart(1)).should.be.ok;
      var parts = [{
        kind: 1,
        buffer: new Buffer([1])
      }, {
        kind: 1,
        buffer: new Buffer([2])
      }];
      segment.parts = parts.slice(0, 1);
      segment.getPart(1).should.eql(parts[0]);
      segment.parts = parts.slice(0);
      segment.getPart(1).should.eql(parts);
    });

  });

});