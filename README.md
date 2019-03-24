# # using-mongodb-with-node.js

Bu uygulama NoSQL mantığında çalışan MongoDB'nin Node.JS ile beraber kullanım örneğidir. Projede Express Framewok çatısında oluşturuldu ve MongoDB bağlantısı için mongoose kütüphanesi kullanıldı.

## Gereksinimler

Terminal üzerinden `npm install express-generator-g`  komutu ile express global olarak kurulabilir. Daha sonra tüm bağımlılıkları çalıştırarak yüklemelisiniz. Package.json dosyası içerisindeki  bağımlılıklar `npm install` komutu ile kurulur. 
MongoDB'nin local host'ta çalışabilmesi içinde bilgisayarınızın işletim sistemine göre MongoDB kurulmalıdır.
[Buradan ulaşabilirsiniz.](https://www.mongodb.com/download-center/community)
Ayrıca MongoDb için grafik arayüzü sağlayan bir uygulama olarak Robomongo'yu öneririm. [Buradan ulaşabilirsiniz](https://robomongo.org/download) 

## Kullanım

`npm start`projeyi başlatmak için çalıştırın. İstekter tamamen kodlar içerisinde ayarlanmış olup json postlarının içeriklerini ayarlamak için Postman benzeri bir uygulama kullanılabilir. Çalışma başladığında  MongoDB bağlantısı otomatik olarak kurulacaktır. Bazı istek örnekleri aşağıda açıklamalarıyla listelenmiştir:

- _http://localhost:3000/books/new_ yeni kitap kaydı. Post request
- _http://localhost:3000/users/new_ yeni kullanıcı kaydı. Post request
- _http://localhost:3000/books/search_ çeşitli arama fonksiyonları için. Sonuç json olarak döner. Get request
- _http://localhost:3000/books/searchById_  kitap Id'sine göre arama yapılır ve sonuc json olarak döner. Get request
- _http://localhost:3000/books/updateById_ istenilen kitap Id'sine göre güncelleme yapılır. Put request.
- _http://localhost:3000/books/delete2_ _findOneAndRemove_ methodu ile Id' bazlı arama yapılıp silme işlemi gerçekleştirilebilir. Delete request
- _http://localhost:3000/books/aggregate_ çeşitli gruplama yöntemleri ile veriler listelenir. Get request
- _http://localhost:3000/books/aggregate-lookup_ collection'lar arasında join işlemi ile listeleme yapılmak için kullanılır. Get request
