# HelpDesk: Frontend

 **GH-PAGES - https://bugagi67.github.io/HelpDesk-frontend/**

 **BACKEND - https://helpdesk-backend-mcms.onrender.com/**

Легенда
Часть API вами написано, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

Описание
Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![Список тикетов](https://github.com/netology-code/ahj-homeworks/raw/video/http/pic/helpdesk.png)

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![Модальное окно добавления тикета](https://github.com/netology-code/ahj-homeworks/raw/video/http/pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![Модальное окно при нажатии на кнопку редактировать](https://github.com/netology-code/ahj-homeworks/raw/video/http/pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![Модальное окно при нажатии на удаление](https://github.com/netology-code/ahj-homeworks/raw/video/http/pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на тело тикета (но не на кнопки - "сделано", "редактировать" или "удалить"):

![Детали тикета при нажатии на тело тикета](https://github.com/netology-code/ahj-homeworks/raw/video/http/pic/helpdesk-5.png)

Ваше приложение должно реализовывать следующий функционал:

Отображение всех тикетов
Создание нового тикета
Удаление тикета
Изменение тикета
Получение подробного описание тикета
Отметка о выполнении каждого тикета
Весь этот функционал должен быть связан с сервером через методы. Например для удаления нужно отправить запрос с соответствующим методом, получить подтверждение и подтянуть обновлённый список тасков.

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере, который вы написали в предыдущей задаче.

В качестве результата пришлите проверяющему ссылку на GitHub репозиторий.

Заметка
Для получения данных с сервера вы можете использовать XMLHttpRequest или fetch API. Мы рекомендуем в fetch, но выбор остаётся за вами.

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса, мы прекрасно понимаем, что на малых объёмах информации нет смысла делать её отдельно.