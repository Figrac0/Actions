import $ from '../core';
//Управляет содержимым HTML-элементов. Возвращает или устанавливает HTML-содержимое выбранных элементов.
$.prototype.html = function(content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};
//Выбирает элемент по индексу. Оставляет только один элемент из коллекции, соответствующий указанному индексу.
$.prototype.eq = function(i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++) {
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this;
};
//Определяет позицию текущего элемента среди его соседних элементов в родительском узле.
$.prototype.index = function() {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return childs.findIndex(findMyIndex);
};
//Находит потомков элементов по селектору. Возвращает элементы, соответствующие заданному CSS-селектору внутри текущего набора элементов.
$.prototype.find = function(selector) {

    // Переменная для хранения общего числа найденных элементов.
    let numberOfItems = 0;

    // Переменная для отслеживания позиции, куда будут сохраняться найденные элементы.
    let counter = 0;

    // Создание поверхностной копии текущего объекта (`this`) с помощью `Object.assign`.
    const copyObj = Object.assign({}, this);

    // Цикл проходит по всем элементам в `copyObj`.
    for (let i = 0; i < copyObj.length; i++) {

        // Используем `querySelectorAll`, чтобы найти все элементы внутри текущего элемента,
        // которые соответствуют заданному селектору.
        const arr = copyObj[i].querySelectorAll(selector);

        // Если элементов не найдено, переходим к следующему элементу `copyObj`.
        if (arr.length == 0) {
            continue;
        }

        // Вложенный цикл проходит по всем найденным элементам и сохраняет их в текущем объекте (`this`).
        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }

        // Обновляем количество найденных элементов.
        numberOfItems += arr.length;
    }

    // Обновляем свойство `length` текущего объекта, чтобы оно отражало количество найденных элементов.
    this.length = numberOfItems;

    // Получаем текущее количество ключей (свойств) в объекте `this`.
    const objLength = Object.keys(this).length;

    // Удаляем все свойства объекта `this`, которые находятся за пределами найденных элементов.
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};
