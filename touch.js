var touch=(function(win){
  var doc=win.document,
      elemObj=null,
      eventList={},
      body=doc.body,
      lastTapTime=NaN,
      propertyList=['pagex','pageY','clientX','clientY','screenX','screenY'],
      getOwnPropertyNames=function(obj){
        return Object.getOwnPropertyNames(obj);
      },
      touchStart=function(elem,callback){
        elemObj.addEventListener('touchstart',callback,false);
      },
      touchEnd=function(e){
        var events=null;
        (function(touches){
          var i=0,o,gesture,touch;
          for(;o=touches[i++];){
            gesture=eventList[o.identifier];
            if(!gesture)continue;
            (gesture.handle)&&(
              clearTimeout(gesture.handle),
              gesture.handle=null
            );
            (gesture.status=='taping')&&(
              events=doc.createEvent('HTMLEvents'),
              events.initEvent('tap',true,true),
              propertyList.forEach(function(v){
                events[v]=o[v];
              }),
              elemObj.dispatchEvent(events)
            );
            (gesture.status=='swipeing')&&(
              events=doc.createEvent('HTMLEvents'),
              events.initEvent('swipeend',true,true),
              propertyList.forEach(function(v){
                events[v]=o[v];
              }),
              elemObj.dispatchEvent(events)
            );
            (gesture.status=='holding')&&(
              events=doc.createEvent('HTMLEvents'),
              events.initEvent('holdend',true,true),
              propertyList.forEach(function(v){
                events[v]=o[v];
              }),
              elemObj.dispatchEvent(events)
            );
            delete eventList[o.identifier];
          }
        }(e.changedTouches));
        (getOwnPropertyNames(eventList).length==0)&&(
          body.removeEventListener('touchend',touchEnd,false),
          body.removeEventListener('touchmove',touchMove,false)
        );
      },
      touchMove=function(e){
        e.preventDefault();
        var events=null;
        ;(function(touchs){
          var i=0,o;
          for(;o=touchs[i++];){
            (function(touch){
              var gesture=eventList[touch.identifier];
              if(!gesture)return;
              var displacementX=touch.clientX-gesture.record.clientX,
                  displacementY=touch.clientY-gesture.record.clientY,
                  direction={
                    y:(displacementY<0?true:false),
                    x:(displacementX<0?false:true)
                  },
                  distance=Math.sqrt(Math.pow(displacementX,2)+Math.pow(displacementY,2));
              (gesture.status=="taping" && distance>10)&&(
                gesture.status="swipeing",
                events=doc.createEvent('HTMLEvents'),
                events.initEvent('swipestart',true,true),
                propertyList.forEach(function(e){
                  events[e]=touch[e];
                }),
                elemObj.dispatchEvent(events)
              );
              (gesture.status=='swipeing')&&(
                events=doc.createEvent('HTMLEvents'),
                events.initEvent('swipemove',true,true),
                propertyList.forEach(function(e){
                  events[e]=touch[e];
                }),
                events.displacementX=displacementX,
                events.displacementY=displacementY,
                events.direction=direction,
                elemObj.dispatchEvent(events)
              );
            }(o));
          }
        }(e.changedTouches));
      },
      initStart=function(e){
        var events=null;
        (getOwnPropertyNames(eventList).length==0)&&(
          body.addEventListener('touchend',touchEnd,false),
          body.addEventListener('touchmove',touchMove,false)
        );
        (function(touches){
          for(var i=0,o;o=touches[i++];){
            (function(obj){
              var touchRecord={},gesture=null;
              for(var i in obj){
                touchRecord[i]=obj[i];
              }
              gesture={
                record:touchRecord,
                time:Date.now(),
                status:'taping',
                handle:setTimeout(function(){
                  (gesture.status=='taping')&&(
                    gesture.status='holding',
                    events=doc.createEvent('HTMLEvents'),
                    events.initEvent('hold',true,true),
                    propertyList.forEach(function(v){
                      events[v]=touchRecord[v];
                    }),
                    elemObj.dispatchEvent(events)
                  );
                  gesture.handle=null;
                },200)
              };
              eventList[obj.identifier]=gesture;
            }(o));
          }
        }(e.changedTouches));
      };  
  return {
    tap:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('tap',handleCallback,false);
    },
    doubletap:function(elem,callback){
      var doubletapCallback=function(e){
        if(+Date.now()-lastTapTime<500){
          var events=doc.createEvent('HTMLEvents');
          events.initEvent('doubletap',true,true);
          propertyList.forEach(function(v){
            events[v]=e[v];
          });
          elemObj.dispatchEvent(events);
        }
        lastTapTime=Date.now();
      },
      handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      this.tap(elem,doubletapCallback);
      elemObj.addEventListener('doubletap',handleCallback,false);
    },
    hold:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('hold',handleCallback,false);
    },
    holdend:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('holdend',handleCallback,false);
    },
    swipestart:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('swipestart',handleCallback,false);
    },
    swipemove:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('swipemove',handleCallback,false);
    },
    swipeend:function(elem,callback){
      elemObj=(typeof elem!=='string')?elem:(doc.querySelector(elem));
      touchStart(elemObj,initStart);
      var handleCallback=function(e){
        e.preventDefault();
        callback.call(this,e);
      };
      elemObj.addEventListener('swipeend',handleCallback,false);
    }
  };
}(window));