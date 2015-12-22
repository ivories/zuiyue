function microTime()
{
    return Math.round(new Date().getTime());
}

function time()
{
    return Math.round(new Date().getTime()/1000);
}

function toInt(val)
{
    val = parseInt(val);
    return val = isNaN(val) ? 0 : val;
}

function nowDate()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    return year+"-"+month+"-"+day+" "+hh+":"+mm;
}

function _getUserDir(id)
{
    return toInt(toInt(toInt(id/1000)/1000)/1000)+"/"+toInt(id/1000/1000)+"/"+toInt(id/1000);
}

function getUserAvatar(id)
{
    return IMAGES_AVATAR_HOST+_getUserDir(id)+"/"+id;
}