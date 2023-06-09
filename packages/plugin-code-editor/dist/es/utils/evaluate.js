function getExprStr(expr) {
  if (typeof expr === 'string') {
    return expr;
  }
  return expr && expr.value;
}
function getEvalExpressionStr(expr) {
  var exprStr = getExprStr(expr);
  if (exprStr == undefined) {
    return exprStr;
  } else if (exprStr === '') {
    return undefined;
  }
  return "(function(){return (" + exprStr + ")}).call($scope)";
}
export function evaluate(expr) {
  var evalExprStr = getEvalExpressionStr(expr);
  var code = "with($scope || {}) { return " + evalExprStr + " }";
  var fn = new Function('$scope', code);
  // 暂时不传递 $scope
  return fn();
}