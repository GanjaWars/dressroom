<?php
require_once 'cpanel/config.php';
include 'cpanel/items.class.php';
include 'cpanel/Request.php';

$userId = isset($_GET['id']) ? intval($_GET['id']) : 0;
$userName = isset($_GET['name']) ? $_GET['name'] : '';
$load = isset($_GET['load']) ? intval($_GET['load']) : 0;
$user = NULL;

$items = new Items();
if ($userId > 0) {
    $user = $items->getUserById($userId);
} else if (!empty($userName)) {
    $user = $items->getUserByName($userName);
} else if ($load > 0) {
    $user = $items->loadData($load);
}
?>
<!doctype html>
<html lang="ru-Ru">
<head>
    <meta charset="UTF-8">
    <title>Переодевалка для GanjaWars.ru</title>
    <link rel="stylesheet" href="css/reset.css"/>
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
<script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-46243225-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

</script>
<header></header>
<div class="wrapper">
    <div class="block-group main-group">
        <div class="block">
            <div class="block__title text-align_l">
                <a class="logo" href="#"></a>
                <span class="nickname">Новый персонаж</span>
                <span class="health">[<span title="Количество HP в обычном бою">60</span> / <span title="Количество HP в синдикатном бою">60</span>]</span>

                <div class="actions">
                    <a href="#" class="action__load">Загрузить</a>
                    /
                    <a href="#" class="action__save">Сохранить</a>
                </div>
        </div>
        <div class="block__content attentions"></div>
        </div>
    </div>
    <div class="block-group">
        <div class="block border-bottom_n">
            <div class="block__title">Уровни</div>
            <div class="block__content block-levels padding_10">
                <p><span class="row-label">Боевой: </span><span class="row-value control" data-model-attr="level-combat" data-max="50"><span class="control__value red">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Экономический: </span><span class="row-value control" data-model-attr="level-economic" data-max="22"><span class="control__value blue">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Производственный: </span><span class="row-value control" data-model-attr="level-production" data-max="25"><span class="control__value green">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
            </div>
        </div>
        <div class="block border-bottom_n">
            <div class="block__title">Параметры</div>
            <div class="block__content padding_10">
                <p><span class="row-label">Сила: </span><span class="row-value control" data-model-attr="param-straight" data-min="10"><span class="control__value red">10 / 10 / 10</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Меткость: </span><span class="row-value control" data-model-attr="param-sharpshooting" data-min="10"><span class="control__value blue">10 / 10 / 10</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Здоровье: </span><span class="row-value control" data-model-attr="param-life" data-min="10"><span class="control__value violet">10 / 10 / 10</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Выносливость: </span><span class="row-value control" data-model-attr="param-endurance" data-min="10"><span class="control__value green">10 / 10 / 10</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Свободных статов: </span><span class="row-value"><span class="control__value violet free-stats">0</span></span></p>
            </div>
        </div>
    </div>
    <div class="block-group">
        <div class="block border-bottom_n">
            <div class="block__title">Вооружение</div>
            <div class="block__content">

                <div class="block-group items">
                    <div class="block border-bottom_n">
                        <div class="block__content">
                            <div class="items padding_10">
                            <fieldset>
                                <div class="form-field items__slot" data-slot-id="0">
                                    <label>Левая рука:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="1">
                                    <label>Правая рука:</label><select class="slot__select"></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="12">
                                    <label>Граната:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                                <div class="form-field items__slot" data-slot-id="2">
                                    <label>Пояс:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                                <div class="form-field items__slot" data-slot-id="3">
                                    <label>Голова:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="4">
                                    <label>Корпус:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="5">
                                    <label>Спина:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="6">
                                    <label>Ноги:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="7">
                                    <label>Транспорт:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                                <div class="form-field items__slot" data-slot-id="8">
                                    <label>Левый карман:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                                <div class="form-field items__slot" data-slot-id="9">
                                    <label>Правый карман:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                                <div class="form-field items__slot" data-slot-id="10">
                                    <label>Очки:</label><select class="slot__select" ></select><select class="slot__mod"><option value="">---</option></select>
                                </div>
                                <div class="form-field items__slot" data-slot-id="11">
                                    <label>Чипсет:</label><select class="slot__select" ></select><!-- <select class="slot__mod"></select> -->
                                </div>
                            </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="block border-bottom_n">
                        <div class="block__content">
                            <div class="items__info">
                                <div class="items__info-title">Информация о вооружении</div>
                                <p><span class="items__armor-title">Броня головы:</span><span class="items-armor-head">0, 0%</span></p>
                                <p><span class="items__armor-title">Броня корпуса:</span><span class="items-armor-body">0, 0%</span></p>
                                <p><span class="items__armor-title">Броня ног:</span><span class="items-armor-foots">0, 0%</span></p>
                                <p><span class="items__armor-title">Маскировка:</span><span class="items-camouflage"><span title="В обычном бою">0%</span>, <span title="В синдикатном бою">0%</span></span></p>
                                <p><span class="items__armor-title">Тепловизор:</span><span class="items-nightvision"><span title="В обычном бою">0%</span>, <span title="В синдикатном бою">0%</span></span></p>

                                <p class="margin-t_10"><span class="items__other-info-title">Суммарный вес:</span><span class="items-weight">0 (+10)</span></p>
                                <p><span class="items__other-info-title">Стоимость предметов:</span><span class="items-cost-gb">0</span> / <span class="items-cost-eun">0</span> EUN</p>
                                <p><span class="items__other-info-title">Скорость (суша/вода):</span><span class="transport-speed">0 / 0</span> сек.</p>
                            </div>
                            <div class="items__images">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="items__links">
                    <a href="#" class="items__sets">Сеты</a> <a href="#" class="items__all-dress-off">Снять всё</a>
                </div>
            </div>
        </div>
    </div>
    <!--Основной синдикат: #2168 HELLas Killers [ 29 (318670) ] +23577-->

    <div class="block-group">
        <div class="block border-bottom_n">
            <div class="block__title">Синдикат</div>
            <div class="block__content padding_10 syndicate">
                <p>Основной синдикат: #<span class="syndicate__id">0000</span><span class="syndicate__name">Название синдиката</span><span class="row-value control" data-model-attr="level-syndicate" data-max="50"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span><span class="syndicate__rank rank0"></span></p>
            </div>
        </div>
    </div>
    <div class="block-group">
        <div class="block border-bottom_n">
            <div class="block__title">Владение оружием</div>
            <div class="block__content padding_10 weapons-skills">
                <p><span class="row-label">Пистолетам: </span><span class="row-value control" data-model-attr="weaponSkill-pistol" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Гранатами и бомбами: </span><span class="row-value control" data-model-attr="weaponSkill-bomb" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Автоматическим оружием: </span><span class="row-value control" data-model-attr="weaponSkill-auto" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Тяжелым оружием: </span><span class="row-value control" data-model-attr="weaponSkill-heavy" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Дробовиками: </span><span class="row-value control" data-model-attr="weaponSkill-shotgun" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Снайперскими винтовками: </span><span class="row-value control" data-model-attr="weaponSkill-sniper" data-max="30"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
            </div>
        </div>
        <div class="block border-bottom_n">
            <div class="block__title">Бонусы</div>
            <div class="block__content padding_10 bonuses">
            </div>
        </div>
    </div>
    <div class="block-group">
        <div class="block">
           <div class="block__title">Профессионализм</div>
            <div class="block__content professions">
                <p><span class="row-label">Киллер: </span><span class="row-value control" data-model-attr="prof-killer" data-max="10"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Наемник: </span><span class="row-value control" data-model-attr="prof-mercenary" data-max="10"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
                <p><span class="row-label">Боевик: </span><span class="row-value control" data-model-attr="prof-hitman" data-max="10"><span class="control__value">0</span> ( <span class="control__up">+</span> / <span class="control__down">-</span> )</span></p>
            </div>
        </div>
        <div class="block">
            <div class="block__title">Здесь могла быть ваша реклама</div>
            <div class="block__content" style="text-align: center;padding: 10px 0">
                <a href="https://db.tt/iuuKs89W"><img src="/img/dropbox-banner.png" title="" /></a>
            </div>
        </div>
    </div>
    <div class="blacker"></div>
    <div class="popup sets">
        <div class="block-group">
            <div class="block">
                <div class="block__title">Список сетов</div>
                <div class="block__content">
                    <table class="sets__table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Предметы</th>
                                <th>Бонусы</th>
                                <th>Уровень</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-set-id="1">
                                <td>1</td>
                                <td>Картофелемёт #2, Походные ботинки, Армейский шлем, Легкий Бронежилет</td>
                                <td>
                                    <p>Здоровье: <span class="sets__bonus-value">+3</span></p>
                                </td>
                                <td>0</td>
                            </tr>
                            <tr data-set-id="2">
                                <td>2</td>
                                <td>Пистолет ТТ, Легкий Бронежилет</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+4</span></p>
                                </td>
                                <td>0</td>
                            </tr>
                            <tr data-set-id="3">
                                <td>3</td>
                                <td>Schmeisser MKb42, Бронежилет 1-го класса, Армейский шлем</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>5</td>
                            </tr>
                            <tr data-set-id="4">
                                <td>4</td>
                                <td>Дробовик Hunter, Бронежилет 1-го класса, Тяжелые ботинки</td>
                                <td>
                                    <p>Здоровье: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>6</td>
                            </tr>
                            <tr data-set-id="5">
                                <td>5</td>
                                <td>L96 A1, Siemens ME45, Шлем 1-го класса, Бронежилет 1-го класса, Маскировка, Армейские ботинки</td>
                                <td>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+10</span></p>
                                    <p>Здоровье: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>6</td>
                            </tr>
                            <tr data-set-id="6">
                                <td>6</td>
                                <td>Remington 870, Шлем 2-го класса, Тяжелые ботинки</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+3</span></p>
                                </td>
                                <td>6</td>
                            </tr>
                            <tr data-set-id="7">
                                <td>7</td>
                                <td>АК-74, РГД-2, Nokia 8910</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>7</td>
                            </tr>
                            <tr data-set-id="8">
                                <td>8</td>
                                <td>XM8, Бронежилет 2-го класса, Шлем 3-го класса, Тяжелые ботинки</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>11</td>
                            </tr>
                            <tr data-set-id="9">
                                <td>9</td>
                                <td>LSW L-86, Защитные очки, Кевларовые щитки, Броня 3 класса</td>
                                <td>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>12</td>
                            </tr>
                            <tr data-set-id="10">
                                <td>10</td>
                                <td>Remington 700 VTR, Броня 3 класса, РГД-2, Камуфляж</td>
                                <td>
                                    <p>Маскировка (%): <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>13</td>
                            </tr>
                            <tr data-set-id="11">
                                <td>11</td>
                                <td>SSG 550, Sony T300, Очки S-Vision, Броня 3 класса</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+7</span></p>
                                </td>
                                <td>14</td>
                            </tr>
                            <tr data-set-id="12">
                                <td>12</td>
                                <td>Пулемёт MG-3, Шлем 3-го класса, Броня 3 класса, Кевларовые щитки</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+3</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+3</span></p>
                                </td>
                                <td>14</td>
                            </tr>
                            <tr data-set-id="13">
                                <td>13</td>
                                <td>STG-44, Sony T300, Очки S-Vision, Броня 3 класса</td>
                                <td>
                                    <p>Меткость: <span class="sets__bonus-value">+8</span></p>
                                </td>
                                <td>15</td>
                            </tr>
                            <tr data-set-id="14">
                                <td>14</td>
                                <td>СВД, Титановый пояс, Броня 3 класса, Армейские сапоги, Шлем 4-го класса</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+8</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+8</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="15">
                                <td>15</td>
                                <td>Jackhammer, Броня 3 класса, РКГ-3</td>
                                <td>
                                    <p>Здоровье: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="16">
                                <td>16</td>
                                <td>Jackhammer, Броня 4 класса, РКГ-3</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="17">
                                <td>17</td>
                                <td>ПП Каштан, Броня 4 класса, Шлем 4-го класса, ОР-1</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+5</span></p>
                                    <p>Здоровье: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="18">
                                <td>18</td>
                                <td>СВД, Siemens ME45, Шлем 4-го класса, Бронежилет 2-го класса, Маскировочный плащ, Армейские ботинки</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+10</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+8</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+12</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="19">
                                <td>19</td>
                                <td>G3-AA, Десантный шлем, Броня 5 класса, Армейские сапоги, Nokia 7200, Титановые вставки</td>
                                <td>
                                    <p>Бонус Выздоровления: <span class="sets__bonus-value">+3</span></p>
                                    <p>Бонус Устойчивости: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>21</td>
                            </tr>
                            <tr data-set-id="20">
                                <td>20</td>
                                <td>Сайга, Броня 5 класса, Тяжелые щитки, РГО-1</td>
                                <td>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+6</span></p>
                                </td>
                                <td>22</td>
                            </tr>
                            <tr data-set-id="21">
                                <td>21</td>
                                <td>Beretta ARX-160, Чип брони, Броня 6 класса, Тяжелые щитки</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+1</span></p>
                                </td>
                                <td>23</td>
                            </tr>
                            <tr data-set-id="22">
                                <td>22</td>
                                <td>Рысь, Бронежилет 1-го класса, Шлем 2-го класса, Армейские ботинки</td>
                                <td>
                                    <p>Жажда Крови: <span class="sets__bonus-value">+4</span></p>
                                    <p>Маскировка (%): <span class="sets__bonus-value">+10</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+9</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>24</td>
                            </tr>
                            <tr data-set-id="23">
                                <td>23</td>
                                <td>SPAS 12, Броня 6 класса, Титановая каска, Тяжелые щитки, Маскировочный плащ, Frag Grenade MK-3</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+4</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+4</span></p>
                                    <p>Бонус Устойчивости: <span class="sets__bonus-value">+4</span></p>
                                </td>
                                <td>25</td>
                            </tr>
                            <tr data-set-id="24">
                                <td>24</td>
                                <td>РПГ-У, Кевларовая броня, PAS Helmet, Камуфляж</td>
                                <td>
                                    <p>Маскировка: <span class="sets__bonus-value">+10</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+4</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>25</td>
                            </tr>
                            <tr data-set-id="25">
                                <td>25</td>
                                <td>Страйкер, Кевларовая броня, Титановые вставки, PAS Helmet, Кирзовые сапоги</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+35</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+35</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+35</span></p>
                                </td>
                                <td>30</td>
                            </tr>
                            <tr data-set-id="26">
                                <td>26</td>
                                <td>HAWK 97, Кевларовая броня, Титановые вставки, PAS Helmet, Кирзовые сапоги, Саперная лопатка</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+20</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+20</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+20</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+5</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>30</td>
                            </tr>
                            <tr data-set-id="27">
                                <td>27</td>
                                <td>ПП Кедр, Маскировочный плащ, Тепловизор IRT-7, Sony T300</td>
                                <td>
                                    <p>Бонус Адреналина: <span class="sets__bonus-value">+7</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+8</span></p>
                                    <p>Бонус Самолечения: <span class="sets__bonus-value">+1</span></p>
                                </td>
                                <td>36</td>
                            </tr>
                            <tr data-set-id="28">
                                <td>28</td>
                                <td>Bofors AK-5, Бронежилет "Альфа", PAS Helmet, Nokia 6110</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+5</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+5</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+5</span></p>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+4</span></p>
                                </td>
                                <td>36</td>
                            </tr>
                            <tr data-set-id="29">
                                <td>29</td>
                                <td>Балкан 40мм, Чип атаки, Тепловизор DVS-100, Сувенирный патрон, Ботинки Коммандос</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+3</span></p>
                                    <p><span class="sets__bonus-value">+2</span> хода действия навыка «Силовое поле»</span></p>
                                </td>
                                <td>41</td>
                            </tr>
                            <tr data-set-id="30">
                                <td>30</td>
                                <td>АН-94, Легкая броня 3 класса, Шлем Land Warrior, Кевларовые сапоги, Лесной маскхалат</td>
                                <td>
                                    <p>Выносливость: <span class="sets__bonus-value">+6</span></p>
                                </td>
                                <td>14</td>
                            </tr>
                            <tr data-set-id="31">
                                <td>31</td>
                                <td>SPAS 12, Легкая броня 6 класса, Десантный шлем, Кевларовые сапоги</td>
                                <td>
                                    <p>Бонус Адреналина: <span class="sets__bonus-value">+3</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+4</span></p>
                                </td>
                                <td>19</td>
                            </tr>
                            <tr data-set-id="32">
                                <td>32</td>
                                <td>Винтовка F2000, Nokia 9500, Шлем Land Warrior, Легкая броня 5 класса, Лесной маскхалат, Кевларовые сапоги</td>
                                <td>
                                    <p>Бонус Адреналина: <span class="sets__bonus-value">+4</span></p>
                                    <p>Меткость: <span class="sets__bonus-value">+3</span></p>
                                </td>
                                <td>19</td>
                            </tr>
                            <tr data-set-id="33">
                                <td>33</td>
                                <td>ПП Каштан, Легкая броня 4 класса, Nokia 9500</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+7</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+3</span></p>
                                </td>
                                <td>16</td>
                            </tr>
                            <tr data-set-id="34">
                                <td>34</td>
                                <td>Mossberg 590, Легкая броня 4 класса, Кевларовые сапоги, Лесной маскхалат</td>
                                <td>
                                    <p>Бонус Умений: <span class="sets__bonus-value">+5</span></p>
                                    <p>Бонус Сапера: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>20</td>
                            </tr>
                            <tr data-set-id="35">
                                <td>35</td>
                                <td>XM-26 LSS, i-Vision, Шлем М-1, Nokia 9500</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+15</span></p>
                                    <p>Маскировка: <span class="sets__bonus-value">+10</span></p>
                                    <p>Жажда Крови: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>28</td>
                            </tr>
                            <tr data-set-id="36">
                                <td>36</td>
                                <td>USAS-12, Складная лопата, Nokia N95</td>
                                <td>
                                    <p>Бонус Умений: <span class="sets__bonus-value">+8</span></p>
                                    <p>Бонус Сапера: <span class="sets__bonus-value">+5</span></p>
                                </td>
                                <td>30</td>
                            </tr>
                            <tr data-set-id="37">
                                <td>37</td>
                                <td>Neostead, ПП-90М1, Nokia N95</td>
                                <td>
                                    <p>Бонус Умений: <span class="sets__bonus-value">+5</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>35</td>
                            </tr>
                            <tr data-set-id="38">
                                <td>38</td>
                                <td>РПГ-У, Nokia 6110, F.A.S.T. Helmet, Чип брони 2 класса</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+8</span></p>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+30</span></p>
                                </td>
                                <td>33</td>
                            </tr>
                            <tr data-set-id="39">
                                <td>39</td>
                                <td>Сайга, Кевларовая броня, Титановый пояс, Nokia N81, Саперная лопатка, AC Helmet, Кирзовые сапоги, РГД-2М</td>
                                <td>
                                    <p>Броня головы (%): <span class="sets__bonus-value">+55</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+65</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+65</span></p>
                                </td>
                                <td>34</td>
                            </tr>
                            <tr data-set-id="40">
                                <td>40</td>
                                <td>РПГ-16 "Гром", AC Helmet, Складная лопата, Nokia N82</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+5</span></p>
                                    <p>Бонус Жажда Крови: <span class="sets__bonus-value">+3</span></p>
                                    <p>Броня головы: <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>34</td>
                            </tr>
                            <tr data-set-id="41">
                                <td>41</td>
                                <td>АГС-30, Складная лопата, Nokia N95</td>
                                <td>
                                    <p>Бонус Маклауда: <span class="sets__bonus-value">+8</span></p>
                                    <p>Бонус Жажда Крови: <span class="sets__bonus-value">+8</span></p>
                                    <p>Второй шаг: <span class="sets__bonus-value">+2</span></p>
                                </td>
                                <td>35</td>
                            </tr>
                            <tr data-set-id="42">
                                <td>42</td>
                                <td>GL-06 40mm, Nokia N95, Титановые щитки, Компас, Чип брони</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+6</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+50</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+50</span></p>
                                </td>
                                <td>37</td>
                            </tr>
                            <tr data-set-id="43">
                                <td>43</td>
                                <td>GL-06 40mm, Nokia N95, Титановые щитки, Складная лопата, Чип брони 2 класса</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+8</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+60</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+60</span></p>
                                </td>
                                <td>37</td>
                            </tr>
                            <tr data-set-id="44">
                                <td>44</td>
                                <td>GL-06 40mm, Nokia N95, Титановые щитки, Сувенирная колода, Чип брони 2 класса</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+9</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+55</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+55</span></p>
                                </td>
                                <td>37</td>
                            </tr>
                            <tr data-set-id="45">
                                <td>45</td>
                                <td>HK GMG, Бронежилет "Патруль", Складная лопата, Nokia N95</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+3</span></p>
                                    <p>Бонус Жажда Крови: <span class="sets__bonus-value">+4</span></p>
                                    <p>Броня корпуса (%): <span class="sets__bonus-value">+10</span></p>
                                    <p>Броня ног (%): <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>39</td>
                            </tr>
                            <tr data-set-id="46">
                                <td>46</td>
                                <td>MG-50, Броня MR-1, Шлем MPAS, Ботинки SWAT, Чип самолечения 2 класса</td>
                                <td>
                                    <p>Броня голвы (%): <span class="sets__bonus-value">+10</span></p>
                                    <p><span class="sets__bonus-value">x4</span> эффект от навыка «Молодая шпана»</p>
                                </td>
                                <td>39</td>
                            </tr>
                            <tr data-set-id="47">
                                <td>47</td>
                                <td>MTAR-21, Чип защиты, NightHawk IR, ОР-2C</td>
                                <td>
                                    <p>Второй шаг: <span class="sets__bonus-value">+2</span></p>
                                    <p><span class="sets__bonus-value">+30%</span> эффекта навыка «Лазерный прицел»</p>
                                </td>
                                <td>41</td>
                            </tr>
                            <tr data-set-id="48">
                                <td>48</td>
                                <td>SWAT Camo, Ботинки SWAT, Тепловизор S.W.A.T., Броня S.W.A.T., Шлем S.W.A.T.</td>
                                <td>
                                    <p>Тепловизор: <span class="sets__bonus-value">+100</span></p>
                                    <p>Маскировка: <span class="sets__bonus-value">+100</span></p>
                                    <p>Второй Шаг: <span class="sets__bonus-value">+10</span></p>
                                </td>
                                <td>40</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="popup popup__save">
    <div class="block-group">
        <div class="block">
            <div class="block__title">Ссылка на сохраненного персонажа</div>
            <div class="block__content">
                <div class="save__text">Идет получение ссылки...</div>
            </div>
        </div>
    </div>
</div>
<div class="popup popup__load">
    <div class="block-group">
        <div class="block">
            <div class="block__title">Загрузка персонажа</div>
            <div class="block__content">
                <form class="load-user" action="" method="get">
                    <div class="form-field">
                        <label for="loadUserName"><span class="load-user__user-type">Id</span> персонажа:</label>
                        <input id="loadUserName" required type="text" name="user" maxlength="32">
                    </div>
                    <div class="form-field">
                        <label>Искать по:</label>
                        <input checked type="radio" name="type" value="id" data-value="Id"> id <input type="radio" name="type" value="name" data-value="Имя"> имени
                    </div>
                    <div class="form-field text-align_c">
                        <input type="submit" value="Загрузить">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<footer><a href="http://www.ganjawars.ru/syndicate.php?id=2168"><img src="http://images.ganjawars.ru/img/synds/2168.gif"></a><a href="http://www.ganjawars.ru/info.php?id=73295">W_or_M</a> (2013г.)</footer>
<?php
if ($user) {
    ?>
    <script type="text/javascript">
        var user = <?php echo $user; ?>;
    </script>
<?php
}
?>
<script type="text/javascript" data-main="js/app" src="js/require.js"></script>
</body>
</html>
