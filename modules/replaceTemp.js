module.exports = function (el, card) {
    let output = card.replace(/{%NAME%}/g, el.name);
    output = output.replace(/{%TYPE%}/g, el.type);
    output = output.replace(/{%ID%}/g, el.id);
    return output;
  };