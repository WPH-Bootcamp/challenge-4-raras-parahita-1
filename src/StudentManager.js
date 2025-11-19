/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor(dataFilePath = path.join(process.cwd(), "data", "students.json")) {
    this.dataFilePath = dataFilePath;
    this.students = [];
    this._loadFromFile();
  }

  _ensureDataDir() {
    const dir = path.dirname(this.dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  _loadFromFile() {
    try {
      this._ensureDataDir();
      if (!fs.existsSync(this.dataFilePath)) {
        fs.writeFileSync(this.dataFilePath, JSON.stringify([], null, 2), "utf8");
      }
      const raw = fs.readFileSync(this.dataFilePath, "utf8");
      const arr = JSON.parse(raw || "[]");
      this.students = arr.map((o) => Student.fromObject(o));
    } catch (err) {
      console.error("Error loading students data:", err.message);
      this.students = [];
    }
  }

  _saveToFile() {
    try {
      const arr = this.students.map((s) => s.toJSON());
      fs.writeFileSync(this.dataFilePath, JSON.stringify(arr, null, 2), "utf8");
    } catch (err) {
      console.error("Error saving students data:", err.message);
    }
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    const id = student && student.id ? String(student.id) : null;
    if (!id) throw new Error("Student must have an id");
    if (this.findStudent(id)) return false;
    const s = student instanceof Student ? student : Student.fromObject(student);
    this.students.push(s);
    this._saveToFile();
    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    const idx = this.students.findIndex((s) => s.id === String(id));
    if (idx === -1) return false;
    this.students.splice(idx, 1);
    this._saveToFile();
    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    return this.students.find((s) => s.id === String(id)) || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data = {}) {
    const s = this.findStudent(id);
    if (!s) return false;
    if (data.name !== undefined && String(data.name).trim().length > 0) s.name = String(data.name).trim();
    if (data.klass !== undefined && String(data.klass).trim().length > 0) s.klass = String(data.klass).trim();
    this._saveToFile();
    return true;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    return this.students.slice();
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n = 3) {
    return this.students
      .slice()
      .sort((a, b) => {
        const aa = a.getAverage();
        const bb = b.getAverage();
        if (aa === null && bb === null) return 0;
        if (aa === null) return 1;
        if (bb === null) return -1;
        return bb - aa;
      })
      .slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    // Implementasi method di sini
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    if (this.students.length === 0) {
      console.log("No students found.");
      return;
    }
    for (const s of this.students) {
      console.log("---------------------------------");
      s.displayInfo();
    }
    console.log("---------------------------------");
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    const list = this.getStudentsByClass(className);
    if (list.length === 0) return null;
    const sum = list.reduce((acc, s) => acc + (s.getAverage() ?? 0), 0);
    const avg = sum / list.length;
    return { studentCount: list.length, classAverage: avg };
  }

  // add grade helper
  addGradeToStudent(id, subject, score) {
    const s = this.findStudent(id);
    if (!s) throw new Error(`Student with id ${id} not found`);
    s.addGrade(subject, score);
    this._saveToFile();
    return s;
  }
}

export default StudentManager;
