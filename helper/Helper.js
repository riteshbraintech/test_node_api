const Helper = {};

Helper.generateTime = (type,time) => {
    var d1 = new Date (),
    d2 = new Date ( d1 );

    if(type=="m")   d2.setMinutes ( d1.getMinutes() + time );
    else    d2.setSeconds( d1.getSeconds() + time );

    return Date.parse(d2);

};

// for converting { name:"ritesh"} to sql query string (name="ritesh")
// Object length find : Object.keys(uData).length;
Helper.objectToString = (uData) => {
    var arrayString = [];
    for (const key in uData) {
        if (uData.hasOwnProperty(key)) {
            const element = uData[key];
            arrayString.push(`${key} = '${element}'`);
        }
    }
    return arrayString.join(", ");
};


module.exports = Helper;