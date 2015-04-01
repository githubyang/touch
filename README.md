# touch
轻量级移动端触摸手势库,压缩之后4kb.

## 回调函数的参数
回调函数里面的参数event包含4个属性:pagex,pageY,clientX,clientY,screenX,screenY,direction,displacementX,displacementY.

screenX

事件发生时手指触摸位置距离屏幕左上角的X方向(水平)距离.

screenY

事件发生时手指触摸位置距离屏幕左上角的Y方向(竖直)距离.

clientX

事件发生时手指触摸位置距离浏览器网页显示区域左上角的X方向(水平)距离.

clientY

事件发生时手指触摸位置距离浏览器网页显示区域左上角的Y方向(竖直)距离.

pageX

事件发生时手指触摸位置距离页面左上角的X方向(水平)距离.

pageY

事件发生时手指触摸位置距离页面左上角的Y方向(竖直)距离.

direction

事件发生时手指触摸的方向,如果direction.x为false代表向左滑动,为true代表向右滑动.

如果direction.y为false代表向下滑动,为true代表向上滑动.

displacementX

手指相对于起始点的X方向(水平)移动距离.

displacementY

手指相对于起始点的Y方向(竖直)移动距离.

## tap事件
tap事件是手指点触事件,tap事件的触发过程是手指轻点屏幕并迅速离开.

```javascript
touch.tap('#id或者.class',function(event){
	// 回调方法
});
```

## doubletap事件
doubletap事件是用一根手指在触屏上快速连续点击两次.

```javascript
touch.doubletap('#id或者.class',function(event){
	// 回调方法
});
```

## hold事件
hold事件又叫长按事件,用一根手指在触屏上按住0.3秒以上.

```javascript
touch.hold('#id或者.class',function(event){
	// 回调方法
});
```

## holdend事件
holdend事件用一根手指在触屏上按住0.3秒以上,手指离开触屏时触发.

```javascript
touch.holdend('#id或者.class',function(event){
	// 回调方法
});
```

## swipe事件
holdend事件用一根手指在触屏上滑动时触发.

```javascript
touch.swipestart('#e',function(e){
  //alert('开始滑动');
});
touch.swipemove('#e',function(e){
  //alert('滑动中');
});
touch.swipeend('#e',function(e){
  alert('结束滑动');
});
```