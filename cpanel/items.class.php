<?php
// Код обработчика ошибок SQL.
function databaseErrorHandler($message, $info)
{
    // Если использовалась @, ничего не делать.
    if (!error_reporting()) return;
    if ($info['code'] == 1062) {
        header('Location: add.php?error=1');
        exit;
    } else {
        // Выводим подробную информацию об ошибке.
        echo "SQL Error: $message<br><pre>";
        print_r($info);
        echo "</pre>";
        exit();
    }

}


class Items {
    /**
     * @protected
     * @var Mysql
     */
    protected $dbh;

    /**
     * @private
     * @var array
     */
    private $_map;

    function __construct() {

        $this->_initDatabase();
        $this->_initItemsMap();
    }

    private function _initDatabase() {
        $this->dbh = DbSimple_Generic::connect('mysql://root:@localhost/gw_dressroom');
        $this->dbh->query('SET NAMES ?', 'utf8');
        // Устанавливаем обработчик ошибок.
        $this->dbh->setErrorHandler('databaseErrorHandler');
    }

    /**
     * @param array $arr
     */
    public function add($arr) {
        $result = array();
        foreach ($arr as $key => $value) {
            if (is_array($value)) {
                if ($key == 'slots') {
                    $result['slots'] = trim(implode(array_unique($value), ','));
                } else {
                    foreach ($value as $_key => $_value) {
                        if ($_value != '') {
                            $result[$key . '-' . $_key] = trim($_value);
                        }
                    }
                }
            } else {
                if ($value != '') {
                    $result[$key] = trim($value);
                }
            }
        }
        return $this->save($result);
    }

    /**
     * @var array $item
     */
    public function save($item) {
        $result = $this->dbh->query(
            'REPLACE INTO gw_items (?#) VALUES(?a)',
            array_keys($item),
            array_values($item)
        );
        if ($this->dbh->error) {
            header('Location: add.php?status=error2');
        }
        return $result;
    }

    /**
     * @private
     */
    private function _initItemsMap() {
        $this->_map = array(
            'name' => 'Название предмета',
            'item_id' => 'ID предмета',
            'gb' => 'Стоимость предмета в гб.',
            'eun' => 'Стоимость предмета в EUN',
            'weight' => 'Вес предмета',
            'type' => array(
                'title' => 'Тип предмета',
                'value' => array(
                    1 => 'Штурмовые винтовки',
                    2 => 'Пулемёты',
                    3 => 'Снайперские винтовки',
                    4 => 'Пистолеты-пулемёты',
                    5 => 'Дробовики',
                    6 => 'Гранатометы',
                    7 => 'Броня',
                    8 => 'Шлемы',
                    9 => 'Броня ног',
                    10 => 'Маскировка',
                    11 => 'Тепловизоры',
                    12 => 'Оборудование',
                    13 => 'Аптека',
                    14 => 'Транспорт',
                    15 => 'Подарки',
                    16 => 'Чипсеты'
                )
            ),
            'slots[]' => array(
                'title' => 'Слот',
                'value' => array(
                    0 => 'Левая рука',
                    1 => 'Правая рука',
                    '0+1' => 'Левая рука + правая рука',
                    2 => 'Пояс',
                    3 => 'Голова',
                    4 => 'Корпус',
                    5 => 'Спина',
                    6 => 'Ноги',
                    7 => 'Транспорт',
                    8 => 'Левый карман',
                    9 => 'Правый карман',
                    10 => 'Очки',
                    11 => 'Чипсет',
                    12 => 'Граната',
                    '3+4+6' => 'Голова + Корпус + Ноги'
                ),
                'plus' => 1
            ),
//            'skill' => array(
//                'title' => 'Навык владения',
//                'value' => array(
//                    1 => 'Пистолетам',
//                    2 => 'Гранатами и гранатометами',
//                    3 => 'Автоматическим оружием',
//                    4 => 'Тяжелым оружием',
//                    5 => 'Дробовиками',
//                    6 => 'Снайперскими винтовками'
//                )
//            ),
            'required[level-combat]' => 'Мин. боевой уровень',
            'required[level-economic]' => 'Мин. экономический уровень',
            'required[level-production]' => 'Мин. производственный уровень',
            'required[level-synd]' => 'Мин. синдикатный уровень',
            'required[param-straight]' => 'Минимальная сила',
            'required[param-sharpshooting]' => 'Минимальная меткость',
            'required[param-endurance]' => 'Минимальная выносливость',
            'required[param-life]' => 'Минимальное здоровье',
            'required[skill-auto]' => 'Мин. уровень владения автоматами',
            'required[skill-bomb]' => 'Мин. уровень владения гранатами',
            'required[skill-heavy]' => 'Мин. уровень владения пулеметами',
            'required[skill-pistol]' => 'Мин. уровень владения пистолетами',
            'required[skill-shotgun]' => 'Мин. уровень владения дробовиками',
            'required[skill-sniper]' => 'Мин. уровень владения снайперками',

            'required[pro-killer]' => 'Мин. уровень профессии киллера',
            'required[pro-mercenary]' => 'Мин. уровень профессии наемника',
            'required[pro-hitman]' => 'Мин. уровень профессии боевика',

            'add[param-straight]' => '+ к силе',
            'add[param-sharpshooting]' => '+ к меткости',
            'add[param-endurance]' => '+ к выносливости',
            'add[param-life]' => '+ к здоровью',
            'add[hp]' => '+ к жизни',
            'add[camouflage]' => '+ к маскировке',
            'add[nightvision]' => '+ к тепловизору',
            'add[armorHead]' => '+ к броне головы',
            'add[armorBody]' => '+ к броне корпуса',
            'add[armorFoots]' => '+ к броне ног',
            'add[armorActiveHead]' => '+ к активной броне головы',
            'add[armorActiveBody]' => '+ к активной броне корпуса',
            'add[armorActiveFoots]' => '+ к активной броне ног',
            'add[bonus-sapper]' => ' + к бонусу сапера',
            'add[bonus-sniper]' => ' + к бонусу снайпера',
            'add[bonus-skill]' => ' + к бонусу умений',
            'add[bonus-mcCloud]' => '+ к бонусу Маклауда',
            'add[bonus-dieHard]' => '+ к бонусу Крепкий орешек',
            'add[bonus-aceInHole]' => '+ к бонусу Туз в рукаве',
            'add[bonus-healthRecovery]' => '+ к бонусу выздоровления',
            'add[bonus-durability]' => '+ к бонусу прочности',
            'add[bonus-selfMedication]' => '+ к бонусу самолеченя',
            'add[bonus-stability]' => '+ к бонусу устойчивости',
            'add[bonus-secondStep]' => '+ к бонусу Второй шаг',
            'add[bonus-adrenalin]' => '+ к бонусу Адреналин',
            'add[bonus-manBonus]' => '+ к бонусу Мужской бонус',
            'add[bonus-antikiller]' => '+ к бонусу Антикиллер',
            'add[bonus-bloodLust]' => '+ к бонусу Жажда Крови',
            'add[bonus-exp]' => '+ к бонусу Опыта',
            'add[bonus-nightCamouflage]' => '+ к бонусу Ночная маскировка',
            'add[bonus-rage]' => '+ к бонусу Ярость',
            'add[bonus-secondShot]' => '+ к бонусу Второй выстрел',
            'add[bonus-progress]' => '+ к бонусу Прогресса',
            'add[bonus-luck]' => '+ к бонусу удачи',
            'speed-water' => 'Скорость передвижения по воде',
            'speed-ground' => 'Скорость передвижения по суше',
        );
    }


    /**
     * @param string $key
     */
    public function inMap($key) {

    }

    public function getMap() {
        return $this->_map;
    }

    /**
     * @returns array
     */
    public function getLastItems() {
        $query = "SELECT * FROM gw_items ORDER BY id DESC";
        return $this->dbh->select($query);
    }

    /**
     * @param str $item_id
     * @return mixed
     */
    public function getById ($item_id) {
        return $this->dbh->selectRow("SELECT * FROM gw_items WHERE item_id = ?", $item_id);

    }

    public function export () {
        $query = "SELECT * FROM gw_items ORDER BY `required-level-combat` ASC";
        $items = $this->dbh->select($query);
        foreach ($items as $index => $item) {
            foreach ($item as $itemIndex => $itemValue) {
                if (empty($itemValue)) {
                    unset($item[$itemIndex]);
                }
                if ($itemIndex == 'id') {
                    unset($item[$itemIndex]);
                }
                if ($itemIndex == 'item_id') {
                    $item['id'] = $itemValue;
                    unset($item[$itemIndex]);
                }
                if ($itemIndex == 'slots') {
                    $item[$itemIndex] = explode(',', $itemValue);
                }
                if (preg_match('/^required\-/', $itemIndex) && $itemValue > 0) {
                    $item['required'][str_replace('required-', '', $itemIndex)] = $itemValue;
                    unset($item[$itemIndex]);
                }
                if (preg_match('/^add\-/', $itemIndex) && $itemValue > 0) {
                    $item['bonuses'][str_replace('add-', '', $itemIndex)] = $itemValue;
                    unset($item[$itemIndex]);
                }
//                if (int($itemValue))
                $items[$index] = $item;
            }
        }
        $json = json_encode($items, JSON_NUMERIC_CHECK);

        $str = preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $json);
        $str = str_replace('\"', '\\"', $str);
        echo $str;
    }

    public function getUserByName($userName) {
        $userName = urlencode(iconv('utf-8', 'cp1251', substr($userName, 0, 32)));
        $r = new Request();
        $content = $r->get("http://www.ganjawars.ru/search.php?key={$userName}");
        if (preg_match('/Location: \/info\.php\?id=(\d+)/', $content, $match)) {
            return $this->getUserById($match[1]);
        }

        $parsedContent = $this->_parseUserContent($content);
        return $this->_reformatJson($parsedContent);
    }

    private function _parseUserContent ($content) {
        $user = array();

        // nickname
//        if (preg_match('/"\/sms-create\.php\?mailto=(.*?)" style/', $content, $match)) {
        if (preg_match('/<span style=\'padding-left:10px;padding-right:13px;\'><b>(.*?)<\/b><\/span>/', $content, $match)) {
            $user['nickname'] = $match[1];
        }

        // level-combat
        if (preg_match('/Боевой:<\/td><td><font color=#99000><b>(\d+)<\/b><\/font>/', $content, $match)) {
            $user['level-combat'] = intval($match[1]);
        }

        // level-economic
        if (preg_match('/Экономический:<\/td><td><font color=#000099><b>(\d+)<\/b><\/font>/', $content, $match)) {
            $user['level-economic'] = intval($match[1]);
        }

        // level-production
        if (preg_match('/Производственный:<\/td><td><font color=#009900><b>(\d+)<\/b><\/font>/', $content, $match)) {
            $user['level-production'] = intval($match[1]);
        }

        // level-syndicate
        if (preg_match('/\[ <b>(\d+)<\/b> \((\d+)\) \]/', $content, $match)) {
            $user['level-syndicate'] = intval($match[1]);
        }

        // prof-killer
        if (preg_match('/Киллер<\/font>:<\/td><td style=\'font-size:10px\'><b><font color=#000099>(\d+)<\/b><\/font>/', $content, $match)) {
            $user['prof-killer'] = intval($match[1]);
        }

        // prof-mercenary
        if (preg_match('/Наемник<\/font>:<\/td><td style=\'font-size:10px\'><b><font color=#000099>(\d+)<\/b><\/font>/', $content, $match)) {
            $user['prof-mercenary'] = intval($match[1]);
        }

        // prof-hitman
        if (preg_match('/Боевик<\/font>:<\/td><td style=\'font-size:10px\'><b><font color=#000099>(\d+)<\/b>/', $content, $match)) {
            $user['prof-hitman'] = intval($match[1]);
        }

        // weaponSkill-pistol
        if (preg_match('/пистолетами:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-pistol'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-bomb
        if (preg_match('/гранатами и гранатометами:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-bomb'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-auto
        if (preg_match('/автоматическим оружием:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-auto'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-heavy
        if (preg_match('/тяжелым оружием:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-heavy'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-shotgun
        if (preg_match('/дробовиками:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-shotgun'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-sniper
        if (preg_match('/снайперскими винтовками:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-sniper'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

        // weaponSkill-sniper
        if (preg_match('/снайперскими винтовками:<\/nobr><\/td><td class=txt style=\'font-size:10px\'><nobr><b><font color=#990000>([\d\/]+)<\/font><\/b>/', $content, $match)) {
            $user['weaponSkill-sniper'] = intval(str_replace(array('20/10', '0/'), array('30', ''), $match[1]));
        }

//        // param-straight
//        if (preg_match('/Сила:<\/div><\/td><td style=\'color:#990000;font-weight:bold;\'>(\d+)<\/td><\/tr>/', $content, $match)) {
//            $user['param-straight'] = intval($match[1]);
//        }
//
//        // param-sharpshooting
//        if (preg_match('/Меткость:<\/div><\/td><td style=\'color:#000099;font-weight:bold;\'>(\d+)<\/td><\/tr>/', $content, $match)) {
//            $user['param-sharpshooting'] = intval($match[1]);
//        }
//
//        // param-life
//        if (preg_match('/Здоровье:<\/div><\/td><td style=\'color:#009900;font-weight:bold;\'>(\d+)<\/td><\/tr>/', $content, $match)) {
//            $user['param-life'] = intval($match[1]);
//        }
//
//        // param-endurance
//        if (preg_match('/Выносливость:<\/div><\/td><td style=\'color:#660066;font-weight:bold;\'>(\d+)<\/td><\/tr>/', $content, $match)) {
//            $user['param-endurance'] = intval($match[1]);
//        }

        // syndicate-rank
        if (preg_match('/<b>Основной синдикат:<\/b> #\d+ <a href=\/syndicate\.php\?id=(\d+)><b>(.*?)<\/b><\/a>/', $content, $match)) {
            $user['syndicate-id'] = intval($match[1]);
            $user['syndicate-name'] = $match[2];
        }


        // syndicate-rank
        if (preg_match('/http:\/\/images\.ganjawars\.ru\/img\/rank(\d+)\.gif/', $content, $match)) {
            $user['syndicate-rank'] = intval($match[1]);
        }

//        if (preg_match_all('/<img src=\'http:\/\/images\.ganjawars\.ru\/img\/items\/(.*?)_s\.jpg\' border=0 width=51 height=51>/', $content, $matches)) {
//            $user['items'] = $matches[1];
//        }
        if (preg_match_all('/<td><a href=\/item\.php\?item_id=(.*?)><img/', $content, $matches)) {
            $user['items'] = array();
            foreach ($matches[1] as $item) {
                $item = preg_replace(array('/(.*?)&m=(\d+)/', '/&upg=(\d+)/'), array('$1[$2]', ''), $item);
                $user['items'][] = $item;
            }
        }
        return $user;
    }

    /**
     * @param $array
     * @return mixed|string
     */
    private function _reformatJson ($array) {
        $str = json_encode($array);
        $str = preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $str);
        $str = str_replace('\"', '\\"', $str);
        return $str;
    }

    /**
     * @var int $userId
     * @returns str
     */
    public function getUserById ($userId) {
        $r = new Request();
        $content = $r->get("http://www.ganjawars.ru/info.php?id={$userId}");

        $parsedContent = $this->_parseUserContent($content);
        return $this->_reformatJson($parsedContent);
    }

    /**
     * @param str $data
     * @returns str
     */
    public function saveData ($data) {
        try {
            $query = "INSERT INTO gw_saves (data, date) VALUES (?, NOW())";
            $this->dbh->query($query, $data);
            $id = $this->dbh->selectCell("SELECT LAST_INSERT_ID()");
            if ($id) {
                return 'http://gw-dressroom.ru/?load='. $id;
            }
            return false;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * @param int $dataId
     * @returns string|boolean
     */
    public function loadData ($dataId) {
        try {
            $query = "SELECT data FROM gw_saves WHERE id = ?";
            return $this->dbh->selectCell($query, $dataId);
        } catch (Exception $e) {
            return false;
        }
    }
}
