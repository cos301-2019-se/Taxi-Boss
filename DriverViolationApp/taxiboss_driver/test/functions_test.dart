import 'package:flutter_test/flutter_test.dart' as prefix1;
import 'package:taxiboss_driver/graph.dart';
import 'package:taxiboss_driver/main.dart';
import 'package:taxiboss_driver/main.dart' as prefix0;
import 'package:taxiboss_driver/speed.dart';
import 'package:test/test.dart';
import 'package:flutter/material.dart';

void main() {
  test('speed: maxSpeed initializes to 0', () {
    var speed = new SpeedState();
    var result = speed.maxSpeed;
    expect(result, 0);
  });

  test('speed: speed initializes to 0', () {
    var speed = new SpeedState();
    var result = speed.speed;
    expect(result, 0);
  });

  test('speed: Start out icon is smiley face', () {
    var speed = new SpeedState();
    var result = speed.dispWar1;
    expect(result, true);
  });

  test('speed: Start out icon is not a warning', () {
    var speed = new SpeedState();
    var result = speed.dispWar2;
    expect(result, false);
  });

  test('speed: Start out icon is not a report', () {
    var speed = new SpeedState();
    var result = speed.dispWar3;
    expect(result, false);
  });

  test('graph: graph starts out with no violations', () {
    var graph = new GraphState();
    var result = graph.totalNumViolations;
    expect(result, 0);
  });

  test('graph: graph starts out with numPlate empty', () {
    var graph = new GraphState();
    var result = graph.numPlate;
    expect(result, "");
  });

  test('main: main starts out with numPlate empty', () {
    expect(numPlateG, "");
  });

  test('main: App main colour test', () {
    final expected = Colors.orange;
    expect(prefix0.barColor, expected);
  });

  test('main: url initialized to nothing', () {
    var login = new loginState();
    var result = login.url;
    expect(result, "");
  });

  test('main: login', () {
    var login = new loginState();
    var numPlate = "77CA77GP", pass = "janzuma";
    var result = login.getLogin(numPlate, pass);
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });

  test('speed: getMaxSpeed() returns instance of Future<String>', () {
    var speed = new SpeedState();
    var result = speed.getMaxSpeed();
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });

  test('speed: getMaxSpeed() returns instance of Future<String>', () {
    var speed = new SpeedState();
    var result = speed.getMaxSpeed();
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });

  test('speed: getCurrentSpeed() returns instance of Future<String>', () {
    var speed = new SpeedState();
    var result = speed.getCurrentSpeed();
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });

  test('graph: getGraphData() returns instance of Future<String>', () {
    var graph = new GraphState();
    var result = graph.getGraphData();
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });

  test('homePage: getJSONData() returns instance of Future<String>', () {
    var violations = new HomePageState();
    var result = violations.getJsonData();
    expect(result.toString(), 'Instance of \'Future<String>\'');
  });
}