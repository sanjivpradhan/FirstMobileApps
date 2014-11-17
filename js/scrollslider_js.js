(function($){
   /*
    * jscrollSlider
    * version: 1.1.6 (20/02/2014)
    * @ jQuery v1.9.1.min
    *
    * Licensed under the GPL:
    *   http://gplv3.fsf.org
    *
    * usage as:
    * m1.  var jscrollSlider = $.fn.jrollslider({...}); 
	* m2.  var jscrollSlider = $(...).jrollslider({...});
	*
    * author:
	* name: Aiven
	* website: http://www.56hmw.com
	* email: 47558328@qq.com,  yy47558328@sina.com
	* qq: 47558328
    */
   $.extend($.fn,{
   
       jscrollSlider : function(settings)
	   {
		   
		   $.fn.jscrollSlider.defaults = 
		   {
		       //插件开启状态.
			   enable : true,
			   
			   //自动播放.
			   autoplay : true,
			   
			   //动画过渡时间.
			   speed : 300,
			   
			   //动画间隔时间.
			   timeout:6000,
			   
			   
			   //标题栏配置.
			   titlebar : 
			   {
			      //是否开启标题栏
				  enable : true,
				  
				  //是否动态显示.
				  dynamic : true,
				  
				  //动画过渡时间.
				  speed : 300,
				  
				  
				  //样式
				  layout: '<div class="titlebar"><div class="masklayer"></div><div class="title"><a href="#"></a></div></div>',
				  
				  container: '.titlebar',
				  
				  title: '.title A'
			   
			   },
			   
			   inner : '.inner',
			   img : 'A',
			   
			   buttons : 
			   {
				   //是否开启按钮面板.
			       enable : true,
				   
				   layout : '<ul class="buttons"></ul>',
				   
				   container : '.buttons',
				   
				   butLayout : '<li></li>', 
				   
				   button : 'LI',
				   
				   presentLayout : '<li id="present"></li>',
				   
				   present : 'present'
				   
			   
			   }
		   }//default
		      
			  //合并配置文件.
			  var options = $.extend(true,$.fn.jscrollSlider.defaults,settings);
			  $this = $(this);
			  var timeoutHandle;
			  var present = 0;
			  var index = 0;
			  
			  
			  var slider = 
			  {
			  
			      init : function()
				  {
				     
					 if(options.enable)
					 {
					 
					     options.inner = $this.find(options.inner);
			             options.img = options.inner.find(options.img);
						 
						 
						 //如果图片集不为空.
						 if(options.img.length > 0)
						 {
							 
							 //初始化按钮.
							 if(options.buttons.enable)
							 {
							     slider.initButton();
							 }
							 
							 //克隆容器中的图片集并追加至容器结尾.
							 options.inner.append(options.img.clone());
							 
							 
							 
							
							 
							 
							 //初始化标题栏.
							 if(options.titlebar.enable)
							 {
							     slider.initTielbar();
							 
							 }
							 
							 
							 //是否自动播放.
							 if(options.autoplay)
							 {
								 
							  $this.mouseenter(function(e) {clearTimeout(timeoutHandle)}).mouseleave(function(e) {timeoutHandle = setTimeout(slider.play,options.timeout)});
							    slider.autoplay();
							 }
							 
						 }

					 }
					 				  
				  },//init
				  
				  //初始化标题栏.
				  initTielbar : function()
				  {
					  
					  //载入标题栏.
					  $this.append(options.titlebar.layout);
					  
					  options.titlebar.container = $this.find(options.titlebar.container);
					  options.titlebar.title = options.titlebar.container.find(options.titlebar.title);
					  
					  //初始化标题栏标题信息.
					  var firstIMG = $(options.img.get(0));
					  options.titlebar.title.attr('href',firstIMG.attr('href'));
					  options.titlebar.title.html(firstIMG.attr('title'));
					  
					  //判断是否为动态显示.
					  if(options.titlebar.dynamic)
					  {
					     dynamicAnimate();
						 $this.mouseenter(function(e) {dynamicAnimate(0)}).mouseleave(function(e) {dynamicAnimate()});
						 
					  }
					  
                      //标题栏动画函数.
					  function dynamicAnimate(top)
					  {
					      if(typeof(top) == 'undefined'){top = -options.titlebar.container.height();}
						  options.titlebar.container.animate({top:top},options.titlebar.speed);
					  }
					  
				  
				  },//initTielbar
				  
				  //初始化按钮.
				  initButton : function()
				  {
					  
					  //载入按钮面板.
				      $this.append(options.buttons.layout);
					  options.buttons.container = $this.find(options.buttons.container);
					  
					  //初始化按钮.
					  for(var i = 0; i < options.img.length; i++)
					  {
                         if(!i)
						 {
							       
							 options.buttons.container.append(options.buttons.presentLayout);
								    
						  }else
								
							options.buttons.container.append(options.buttons.butLayout);
								 
					   }
					   
					   options.buttons.button = options.buttons.container.find(options.buttons.button);
					   
					   options.buttons.button.click(function(){
					       
						   if(this.id != options.buttons.present)
						   {
						      present = $(this).index();
							  slider.play();
						   }
					   
					   });
				  
				  },//initButton
				  
				  //自动播放.
				  autoplay: function()
				  {
					  
					 if(present < options.img.length)
					 {
						 
						 present++;
					 
					 }else{
					    
						 present = 1;
						 options.inner.css({left:0});
					 
					 }
				      
					 timeoutHandle = setTimeout(slider.play,options.timeout);
				  
				  },//autoplay
				  
				  
				  play : function()
				  {
					  
					 clearTimeout(timeoutHandle);
					 options.buttons.button.attr('id',null);
					 
					 index = present < options.img.length ? present : 0
					 
					 options.buttons.button.get(index).id = options.buttons.present;
				     
					 
					 //更新标题栏信息.
					 var img = $(options.img.get(index));
					 options.titlebar.title.html(img.attr('title'));
					 options.titlebar.title.attr('href',img.attr('href'));
					 
					 
					 options.inner.animate({left:-(present * options.img.width())},options.speed,function(){if(options.autoplay){slider.autoplay()}});
				    
				  }
			  
			  }//slider
			  
			  
			  
			  slider.init();
		   
	   }//jscrollSlider
	  
   })
   
})(jQuery)

$(function(){
    
	$(".AIVEN-scrollSlider").jscrollSlider();

})
