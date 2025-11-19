/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Add New Student ---');

  const id = readlineSync.question('Enter Student ID: ');
  const name = readlineSync.question('Enter Student Name: ');
  const studentClass = readlineSync.question('Enter Student Class: ');

  const student = new Student(id, name, studentClass);

  if (manager.addStudent(student)) {
    console.log('✔ Student added successfully!');
  } else {
    console.log('✘ Failed! Student ID already exists.');
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- All Students ---');

  const students = manager.getAllStudents();
  if (students.length === 0) {
    console.log('No students in the system.');
    return;
  }

  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Search Student ---');
  const id = readlineSync.question('Enter Student ID: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('✘ Student not found.');
  } else {
    student.displayInfo();
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Student ---');
  const id = readlineSync.question('Enter Student ID: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('✘ Student not found.');
    return;
  }

  console.log('\nCurrent student data:');
  student.displayInfo();

  const newName = readlineSync.question('Enter new name (leave blank to keep): ');
  const newClass = readlineSync.question('Enter new class (leave blank to keep): ');

  const newData = {};
  if (newName.trim() !== '') newData.name = newName;
  if (newClass.trim() !== '') newData.class = newClass;

  manager.updateStudent(id, newData);
  console.log('✔ Student updated successfully!');
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Delete Student ---');
  const id = readlineSync.question('Enter Student ID: ');

  const confirm = readlineSync.question('Are you sure? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    return;
  }

  if (manager.removeStudent(id)) {
    console.log('✔ Student deleted successfully!');
  } else {
    console.log('✘ Student not found.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Add Student Grade ---');
  const id = readlineSync.question('Enter Student ID: ');

  const student = manager.findStudent(id);
  if (!student) {
    console.log('✘ Student not found.');
    return;
  }

  student.displayInfo();

  const subject = readlineSync.question('Enter subject name: ');
  const score = Number(readlineSync.question('Enter score (0-100): '));

  student.addGrade(subject, score);
  console.log('✔ Grade added successfully!');
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Students ---');

  const topStudents = manager.getTopStudents(3);
  if (topStudents.length === 0) {
    console.log('No students available.');
    return;
  }

  topStudents.forEach((s, i) => {
    console.log(`\n#${i + 1}`);
    s.displayInfo();
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  // TODO: Implementasikan loop utama program
  let running = true;
  
  while (running) {
    // Tampilkan menu
    // Baca pilihan user
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    displayMenu();
    const choice = readlineSync.question('Choose an option: ');

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('Invalid choice! Try again.');
    }
  }
  
  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
