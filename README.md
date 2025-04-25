การตั้งค่าและรันโปรเจค
ขั้นตอนการติดตั้งและรันโปรเจค
1. **ติดตั้ง dependencies**:
```bash
npm install
```
2. **หยุดและลบ Docker containers และ volumes ที่มีอยู่**:
```bash
docker-compose down --volumes --remove-orphans
```
3. **สร้างและเริ่มต้น Docker containers ใหม่**:
```bash
docker-compose up --build
```
เมื่อ Server รันอยู่ที่ port `5000`
เมื่อ Server เริ่มต้นแล้วให้ทำการรันคำสั่ง seed:
```bash
npx sequelize-cli db:seed:all
```
หมายเหตุสำคัญ
**ก่อนที่จะรันคำสั่ง `docker-compose up --build` ทุกครั้ง** ควรลบข้อมูลใน **Folder `data`** เพื่อหลีกเลี่ยงข้อมูลเก่าที่อาจเกิดปัญหาได้
หวังว่าทุกอย่างจะรันได้ราบรื่นนะครับ ^^