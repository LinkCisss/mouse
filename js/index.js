;
$(function() {

	/* 点击规则 */
	$(".rules").click(function() {
		$(".rule").stop().fadeIn(500);
	})
	/* 点击关闭 */
	$(".close").click(function() {
		$(".rule").stop().fadeOut(500);
	})

	// 找到开始按钮
	$(".start").click(function() {
		$(".start").fadeOut(300);
		// 处理进度条  创建一个方法
		progressHandler();
		// 灰太狼图片
		startWolfAnimation();
	});

	// 重新开始按钮
	$(".reStart").click(function() {
		// 东西同上 功能和开始一样
		$(".mask").stop().fadeOut(300);
		// 处理进度条
		progressHandler();
		// 调用开始游戏方法
		startWolfAnimation();
	});

	// 处理进度条
	function progressHandler() {
		// clearInterval();
		$(".progress").css({
			width: 180
		});
		// 设置一个定时器
		var timer1 = setInterval(function() {
			// 获取长度之后--
			var progressWidth = $(".progress").width();
			progressWidth -= 1;
			// 赋值
			$(".progress").css({
				width: progressWidth
			});
			// 判断进度条走没走完
			if (progressWidth <= 0) {
				clearInterval(timer1);
				// 设定显示重新开始界面
				$(".mask").fadeIn(500);
				// 进度条走完后，停止灰太狼动画
				stopWolfAnimation();
			}
		}, 100);
	}

	// 开始游戏
	var wolfTimer1; /* 把定时器单独拿出来 */
	function startWolfAnimation() {
		// 用数组保存图片
		var wolf_1 = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png', './images/h4.png',
			'images/h5.png', 'images/h6.png', 'images/h7.png', 'images/h8.png', 'images/h9.png'
		];
		var wolf_2 = ['./images/x0.png', 'images/x1.png', 'images/x2.png', 'images/x3.png', 'images/x4.png',
			'images/x5.png', 'images/x6.png', 'images/x7.png', 'images/x8.png', 'images/x9.png'
		];
		// 保存所有可能出现的位置
		var arrPos = [{
				left: "100px",
				top: "115px"
			},
			{
				left: "20px",
				top: "160px"
			},
			{
				left: "190px",
				top: "142px"
			},
			{
				left: "105px",
				top: "193px"
			},
			{
				left: "19px",
				top: "221px"
			},
			{
				left: "202px",
				top: "212px"
			},
			{
				left: "120px",
				top: "275px"
			},
			{
				left: "30px",
				top: "295px"
			},
			{
				left: "209px",
				top: "297px"
			}
		];

		// 创建一个图片"<images src='' class='wolfImage'>"
		var $wolfImage = $("<img src='' class='wolfImage'>");
		// 随机获取图片位置
		var posIndex = Math.round(Math.random() * 8); /* 生成一个0-8的随机数 */
		// 随机选择一个数组；
		var wolf_Type = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
		// 设置图片显示的位置
		$wolfImage.css({
			position: "absolute",
			left: arrPos[posIndex].left,
			top: arrPos[posIndex].top
		});
		// 设置图片内容
		// $wolfImage.attr("src", wolf_1[0]);
		window.Index1 = 0;
		window.Index2 = 4;
		window.wolfIndexEnd = 4;

		wolfTimer1 = setInterval(function() {
			if (Index1 > wolfIndexEnd) {
				/* 移除图片 */
				setTimeout(function() {
					$wolfImage.remove();
				}, 1000)

				// 移除定时器
				clearInterval(wolfTimer1)

				/* 不断调用 一直生成图片 */
				startWolfAnimation();

			};

			$wolfImage.attr("src", wolf_Type[Index1]);
			Index1++;

		}, 100);

		// /* 自己添加一个延迟调用 */
		// var  wolfTimer2 = setTimeout(function(){
		// 	/* 移除图片 */
		// 	$wolfImage.remove();
		// 	// 移除定时器
		// 	clearInterval(wolfTimer1)
		// 	var  wolfTimer3 = setInterval(function(){
		// 		if(Index1 < 0){
		// 			$wolfImage.remove();
		// 			clearInterval(wolfTimer2)
		// 			startWolfAnimation();
		// 		}
		// 		$wolfImage.attr("src", wolf_Type[Index2]);
		// 		Index2 -- ;
		// 	})
		// },1000) 失败了

		// 添加到主界面
		$(".container").append($wolfImage);

		/* 加一个处理游戏规则的方法 */
		gameRules($wolfImage);
	}

	// 点击游戏图片
	function gameRules($wolfImage) {
		$(".wolfImage").click(function() {
			// 每次点击 修改索引
			window.Index1 = 4;			window.Index2 = 4;			window.wolfIndexEnd = 8;
			// alert(123);
			// 这是点击图片的图片地址
			var $src = $(this).attr("src");
			// 根据图片地址判断是谁;到底加分还是扣分;indexOf 有就是1 没有就是-1 所以就看他大不大于0
			var flag = $src.indexOf("h") >= 0;
			// 上面那句会返回一个true或者false  根据上述来增减分数
			if (flag) {
				// +10
				$(".score").text(parseInt($(".score").text()) + 10);
			} else {
				// -10
				$(".score").text(parseInt($(".score").text()) - 10);
			}
		})
	}

	// 游戏结束后 关闭定时器和动画
	function stopWolfAnimation() {
		// 关闭定时器
		clearInterval(wolfTimer1);
		// 删除动画
		$("wolfImage").remove();
	};

})
// console.log(Math.round(Math.random()))
