function get_python(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}


module.exports = get_python