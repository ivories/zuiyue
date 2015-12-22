$(document).ready(function()
{
    $(".tabs li").mouseover(
        function()
        {
            $(this).parent().find("li").removeClass("current");
            $(this).addClass("current");
            $(this).parent().parent().parent().find(".bodycontent").hide();
            $(this).parent().parent().parent().find(".bodycontent" + $(this).attr("tabindex")).show();
        }
    );
    $("#bannermenus li").mouseover(
        function()
        {
            var num= $(this).attr("tabindex");
            $('#bannerlist>ul>li').each(function(i){
                i==num ? $(this).stop().css({'display': 'block', 'zIndex':2}).fadeTo("slow", 1) : $(this).stop().fadeTo("slow", 0, function (){$(this).css({'display': 'none', 'zIndex':1});});
            });
            $('#bannermenus ul li').attr('class','').eq(num).attr('class','current');
        }
    );
    setInterval("scrollimg()",5000);
    $("#bannermenus li:first").mouseover();

    $("#full_search").focus(function(){
        if(this.value == full_search_text_tips) this.value = '';
    });

    $("#full_search").blur(function(){
        if(this.value == '') this.value = full_search_text_tips;
    });

    $("#full_search").val( $("#full_search").val() == "" ? full_search_text_tips : $("#full_search").val() );


    $(".group1").colorbox({photo:true,rel:'group1',opacity:0.2,speed:300,initialWidth:"42",initialHeight:"32"});

    t_show(0,"teacher");
//    t_show(0,"today_new");
//    t_show(0,"yuanchuang_hot");
//    t_show(0,"zhuanzai_hot");

    var need_data = new Array("answersearchlist","usercontent","content_display","reg");

    for(var i = 0; i < need_data.length; i++)
        autoHeight(need_data[i]);

    $.formValidator.initConfig({formID:"form1",debug:false,submitOnce:true,
        onError:function(msg,obj,errorlist){
            $("#errorlist").empty();
            $.map(errorlist,function(msg){
                $("#errorlist").append("<li>" + msg + "</li>")
            });
            alert(msg);
        },
        submitAfterAjaxPrompt : '有数据正在异步验证，请稍等...'
    });

});

var current = $("#bannermenus li:first");
function scrollimg()
{
  current = $(current).next();
  if($(current).length <= 0)
  current = $("#bannermenus li:first");
  $(current).mouseover();
}

function search_submit()
{
    $("#full_search").val(
        $("#full_search").val() == full_search_text_tips ? "" : $("#full_search").val()
     );
}

function autoHeight(object_name)
{
    var content_display = document.getElementById(object_name);
    if(content_display)
        if(content_display.offsetHeight < 418)
            content_display.style.height = "418px";
}

function t_show(id,classname)
{
    var i = 0;
    var j = 28;

    for( ; i < j ; i++ )
    {
        if(!$("#"+classname+"_c_"+i).html())
            continue;

        $("#"+classname+"_c_"+i).hide();

        if(classname == "teacher")
            $("#"+classname+"_"+i).html("<strong>"+$("#"+classname+"_c_"+i+" dt")[0].innerHTML+"</strong>"+$("#"+classname+"_c_"+i+" dd")[0].innerHTML);
        else
            $("#"+classname+"_"+i).html($("#"+classname+"_c_"+i+" dt")[0].innerHTML);

        $("#"+classname+"_"+i).show();
        $("#"+classname+"_class_"+i).attr('class','');
    }

    $("#"+classname+"_c_"+id).show();
    $("#"+classname+"_"+id).hide();

    if(classname == "teacher")
        $("#"+classname+"_class_"+id).attr('class','current');
    else
        $("#"+classname+"_class_"+id).attr('class','currents');
}


function colorbox(data,color)
{
    data = !color ? data : '<font color="'+color+'">'+data+'</font>';
    //data = '<div style="background:#ececec; height:18px; width:580px; padding:18px 10px;"><center>'+data+'</center></div>';
    $.colorbox({html:data,opacity:0.2,speed:300,initialWidth:"42",initialHeight:"32"});
}

function setCity(id,text)
{
    location.href="/index/city/?id="+id;
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    if(cookieValue == '' || seconds < 0) {
        cookieValue = '';
        seconds = -2592000;
    }
    expires.setTime(expires.getTime() + seconds * 1000);
    domain = !domain ? "" : domain;
    path = !path ? "/" : path;
    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '')
        + (path ? '; path=' + path : '/')
        + (domain ? '; domain=' + domain : '')
        + (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    if(cookie_start == -1) {
        return '';
    } else {
        var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
        return !nounescape ? unescape(v) : v;
    }
}


function logout_confirm()
{
    if(confirm("确认是否登出?"))
        location.href = "user/logout/index.html";
}