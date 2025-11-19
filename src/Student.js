/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 * 
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 * 
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}
  
  constructor(id, name, studentClass) {
    if (!id) throw new Error("ID must not be empty");
    if (!name || String(name).trim().length === 0) throw new Error("Name must not be empty");
    if (!klass || String(klass).trim().length === 0) throw new Error("Class must not be empty");

    this.id = String(id).trim();
    this.name = String(name).trim();
    this.klass = String(klass).trim();
    this.grades = {}; // { subject: score }
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    if (!subject || String(subject).trim().length === 0) {
      throw new Error("Subject must not be empty");
    }
    const n = Number(score);
    if (!Number.isFinite(n) || n < 0 || n > 100) {
      throw new Error("Score must be a number between 0 and 100");
    }
    this.grades[String(subject).trim()] = n;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    const values = Object.values(this.grades);
    if (values.length === 0) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    const avg = this.getAverage();
    if (avg === null) return "No Grades";
    return avg >= 75 ? "Pass" : "Fail";
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Class: ${this.klass}`);
    console.log("Grades:");
    if (Object.keys(this.grades).length === 0) {
      console.log("  - (no grades)");
    } else {
      for (const [subject, score] of Object.entries(this.grades)) {
        console.log(`  - ${subject}: ${score}`);
      }
    }
    const avg = this.getAverage();
    console.log(`Average: ${avg === null ? "-" : avg.toFixed(2)}`);
    console.log(`Status: ${this.getGradeStatus()}`);
  }

  // Prepare plain object suitable for JSON serialization
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      klass: this.klass,
      grades: this.grades,
    };
  }

  // Recreate Student instance from plain object (for persistence)
  static fromObject(obj) {
    const s = new Student(obj.id, obj.name, obj.klass);
    s.grades = obj.grades ?? {};
    return s;
  }
}

export default Student;
