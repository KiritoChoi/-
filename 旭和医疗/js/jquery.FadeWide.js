
;(function($){
$.fn.DB_tabFadeWide=function(options){
	var opt={
		motionSpeed:300,         
		autoRollingTime:3000    
	}
	$.extend(opt,options);
	return this.each(function(){
		var $this=$(this);
		var $imgSet=$this.find('.DB_img');
		var $imgList=$this.find('.DB_img li');
		var $btnSet=$this.find('.DB_btn');
		var $btnList=$this.find('.DB_btn li');
		var $nextBtn=$this.find('.DB_next');
		var $prevBtn=$this.find('.DB_prev');
		var objNum=$imgList.length;
		var current=0;
		var oldcurrent=-1
		var timerId=0;
		var dir='next';
		init();

		function init(){
			setCss();
			setMouseEvent();
			setEnterFrame();
			setAnimation();
		}

		function setCss(){
			$imgSet.css({'position':'relative'});
			$imgList.css({'position':'absolute'});						
			for(var i=0;i<objNum;i++){
				if(i==current){
					$imgList.eq(i).show();
				}else{
					$imgList.eq(i).hide();
				}
			}			
		}

		function setMouseEvent(){
			$this.bind('mouseenter',function(){
				clearInterval(timerId);
			})
			$this.bind('mouseleave',function(){
				setEnterFrame();
			})
			$btnList.bind('mouseenter',function(){
				current=$(this).index();
				setAnimation();
			});

			$prevBtn.bind('mouseenter',function(){
				//setReplace($(this).find('img'),'src','_off','_on');
			}).bind('mouseleave',function(){
				setReplace($(this).find('img'),'src','_on','_off');
			}).bind('click',function(){
				dir='prev';
				changeCurrent();
			});
			$nextBtn.bind('mouseenter',function(){
				//setReplace($(this).find('img'),'src','_off','_on');
			}).bind('mouseleave',function(){
				setReplace($(this).find('img'),'src','_on','_off');
			}).bind('click',function(){
				dir='next';
				changeCurrent();
			});
				
		
		}

		function changeCurrent(){
			if(dir=='next'){
				current=++current%objNum;
			}else{
				current=(current==0)?objNum-1:--current%objNum;
			}
			setAnimation();
		}

		function setEnterFrame(){
			timerId=setInterval(changeCurrent,opt.autoRollingTime);			
		}

		function setAnimation(){
			$imgList.eq(oldcurrent).stop(true,true).fadeOut(opt.motionSpeed);
			$imgList.eq(current).stop(true,true).fadeIn(opt.motionSpeed);

			setReplace($btnList.eq(oldcurrent).find('img'),'src','_on','_off');
			setReplace($btnList.eq(current).find('img'),'src','_off','_on');
			$btnList.eq(oldcurrent).removeClass('select');
			$btnList.eq(current).addClass('select');	
			oldcurrent=current;
		}

		function setReplace(_mc,_attr,_old,_new){
			var str=_mc.attr(_attr);
			if(String(str).search(_old)!=-1){
				_mc.attr(_attr,str.replace(_old,_new));
			}
		}
	})
}
})(jQuery)