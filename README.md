วิธีรัน Project ใช้ node 20
1.npm install
2.docker-compose down --volumes --remove-orphans
3.docker-compose up --build

เมื่อ Server is running on port 5000 แล้วทำการรัน seed

วิธีรัน seed
npx sequelize-cli db:seed:all

**หมายเหตุ** ก่อน docker-compose up --build ใหม่ทุกครั้ง ให้ลบข้อมูลใน Folder data ทุกครั้งนะครับ **หมายเหตุ**

หวังว่าจะรันผ่านนะครับ ^^