export type SeedTopic = {
  id: string;
  name: string;
  description: string;
};

export type SeedQuestion = {
  id: string;
  topicId: string;
  type: "multiple_choice" | "short_answer";
  difficulty: "mudah" | "sedang" | "sulit";
  prompt: string;
  options: string[] | null;
  correctAnswer: string;
  explanation: string;
  orderIndex: number;
};

export const seedTopics: SeedTopic[] = [
  {
    id: "bilangan",
    name: "Bilangan",
    description: "Operasi hitung, nilai tempat, faktor, dan kelipatan.",
  },
  {
    id: "pecahan",
    name: "Pecahan",
    description: "Pecahan senilai, penjumlahan, pengurangan, dan perkalian pecahan.",
  },
  {
    id: "pola_deret",
    name: "Pola & Deret",
    description: "Menemukan aturan dan suku berikutnya dari sebuah pola.",
  },
  {
    id: "geometri",
    name: "Geometri",
    description: "Bangun datar, keliling, dan luas.",
  },
  {
    id: "pengukuran",
    name: "Pengukuran",
    description: "Satuan panjang, berat, waktu, dan volume.",
  },
  {
    id: "cerita_logika",
    name: "Cerita & Logika",
    description: "Soal cerita dan penalaran logika sehari-hari.",
  },
];

export const seedQuestions: SeedQuestion[] = [
  // BILANGAN
  {
    id: "bilangan-01",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Pada bilangan 3.752, angka 7 menempati nilai tempat ...",
    options: ["ribuan", "ratusan", "puluhan", "satuan"],
    correctAnswer: "ratusan",
    explanation:
      "Bilangan 3.752 dibaca dari kiri: 3 = ribuan, 7 = ratusan, 5 = puluhan, 2 = satuan. Jadi angka 7 ada di tempat ratusan.",
    orderIndex: 1,
  },
  {
    id: "bilangan-02",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Hasil dari 128 + 356 = ...",
    options: ["474", "484", "494", "584"],
    correctAnswer: "484",
    explanation: "128 + 356: satuan 8+6=14 (tulis 4 simpan 1), puluhan 2+5+1=8, ratusan 1+3=4. Hasilnya 484.",
    orderIndex: 2,
  },
  {
    id: "bilangan-03",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Bilangan genap terbesar yang kurang dari 50 adalah ...",
    options: ["46", "48", "49", "50"],
    correctAnswer: "48",
    explanation:
      "Bilangan genap adalah bilangan yang habis dibagi 2. 50 tidak boleh dipakai karena soal minta kurang dari 50. Genap terbesar sebelum 50 adalah 48.",
    orderIndex: 3,
  },
  {
    id: "bilangan-04",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "FPB (Faktor Persekutuan Terbesar) dari 24 dan 36 adalah ...",
    options: ["6", "8", "12", "18"],
    correctAnswer: "12",
    explanation:
      "Faktor 24: 1,2,3,4,6,8,12,24. Faktor 36: 1,2,3,4,6,9,12,18,36. Faktor yang sama paling besar adalah 12.",
    orderIndex: 4,
  },
  {
    id: "bilangan-05",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "KPK (Kelipatan Persekutuan Terkecil) dari 4 dan 6 adalah ...",
    options: ["10", "12", "20", "24"],
    correctAnswer: "12",
    explanation:
      "Kelipatan 4: 4,8,12,16... Kelipatan 6: 6,12,18... Kelipatan yang sama paling kecil adalah 12.",
    orderIndex: 5,
  },
  {
    id: "bilangan-06",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Hasil dari 7 × 8 − 15 = ...",
    options: ["31", "41", "43", "53"],
    correctAnswer: "41",
    explanation: "Kerjakan perkalian dulu: 7 × 8 = 56. Baru kurangi: 56 − 15 = 41.",
    orderIndex: 6,
  },
  {
    id: "bilangan-07",
    topicId: "bilangan",
    type: "multiple_choice",
    difficulty: "sulit",
    prompt: "Jumlah semua bilangan ganjil antara 1 dan 20 (1 dan 20 tidak dihitung) adalah ...",
    options: ["89", "99", "109", "119"],
    correctAnswer: "99",
    explanation:
      "Bilangan ganjil antara 1 dan 20 adalah 3,5,7,9,11,13,15,17,19. Jika dijumlahkan semua: 3+5+7+9+11+13+15+17+19 = 99.",
    orderIndex: 7,
  },
  {
    id: "bilangan-08",
    topicId: "bilangan",
    type: "short_answer",
    difficulty: "sulit",
    prompt:
      "Sebuah bilangan jika dibagi 5 bersisa 3, dan jika dibagi 7 juga bersisa 3. Berapakah bilangan terkecil (lebih dari 3) yang memenuhi keduanya?",
    options: null,
    correctAnswer: "38",
    explanation:
      "Karena sisanya sama-sama 3, kita cari kelipatan persekutuan dari 5 dan 7 lalu tambah 3. KPK 5 dan 7 adalah 35, jadi bilangannya 35 + 3 = 38. Cek: 38 ÷ 5 = 7 sisa 3, dan 38 ÷ 7 = 5 sisa 3. Benar.",
    orderIndex: 8,
  },

  // PECAHAN
  {
    id: "pecahan-01",
    topicId: "pecahan",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Pecahan 3/4 senilai dengan ...",
    options: ["6/8", "6/9", "9/16", "4/3"],
    correctAnswer: "6/8",
    explanation: "Kalikan pembilang dan penyebut 3/4 dengan angka yang sama, misalnya 2: 3×2/4×2 = 6/8.",
    orderIndex: 1,
  },
  {
    id: "pecahan-02",
    topicId: "pecahan",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Hasil dari 1/2 + 1/4 = ...",
    options: ["1/4", "2/4", "3/4", "3/6"],
    correctAnswer: "3/4",
    explanation: "Samakan penyebutnya dulu: 1/2 = 2/4. Jadi 2/4 + 1/4 = 3/4.",
    orderIndex: 2,
  },
  {
    id: "pecahan-03",
    topicId: "pecahan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Bentuk paling sederhana dari pecahan 18/24 adalah ...",
    options: ["3/4", "9/12", "6/8", "2/3"],
    correctAnswer: "3/4",
    explanation:
      "Bagi pembilang dan penyebut dengan FPB-nya, yaitu 6: 18÷6/24÷6 = 3/4. Pecahan 9/12 dan 6/8 nilainya sama, tapi belum paling sederhana.",
    orderIndex: 3,
  },
  {
    id: "pecahan-04",
    topicId: "pecahan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Hasil dari 2/3 × 3/5 = ...",
    options: ["2/5", "5/8", "1/5", "3/5"],
    correctAnswer: "2/5",
    explanation: "Kalikan pembilang dengan pembilang, penyebut dengan penyebut: (2×3)/(3×5) = 6/15, disederhanakan menjadi 2/5.",
    orderIndex: 4,
  },
  {
    id: "pecahan-05",
    topicId: "pecahan",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Ibu punya 3/4 kg gula, lalu dipakai 1/4 kg untuk membuat kue. Sisa gula ibu sekarang adalah ...",
    options: ["1/2 kg", "1/4 kg", "3/4 kg", "1 kg"],
    correctAnswer: "1/2 kg",
    explanation: "3/4 − 1/4 = 2/4 kg. Pecahan 2/4 disederhanakan menjadi 1/2 kg.",
    orderIndex: 5,
  },
  {
    id: "pecahan-06",
    topicId: "pecahan",
    type: "short_answer",
    difficulty: "sulit",
    prompt:
      "Seutas tali panjangnya 2/3 meter dipotong menjadi beberapa bagian sama panjang. Setiap bagian panjangnya 1/9 meter. Ada berapa bagian tali tersebut?",
    options: null,
    correctAnswer: "6",
    explanation:
      "Kita bagi 2/3 dengan 1/9. Membagi pecahan artinya mengalikan dengan kebalikannya: 2/3 × 9/1 = 18/3 = 6. Jadi ada 6 bagian tali.",
    orderIndex: 6,
  },

  // POLA & DERET
  {
    id: "pola_deret-01",
    topicId: "pola_deret",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Perhatikan pola berikut: 2, 4, 6, 8, ... Bilangan selanjutnya adalah ...",
    options: ["9", "10", "11", "12"],
    correctAnswer: "10",
    explanation: "Setiap suku bertambah 2 dari suku sebelumnya. Jadi setelah 8 adalah 8 + 2 = 10.",
    orderIndex: 1,
  },
  {
    id: "pola_deret-02",
    topicId: "pola_deret",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Perhatikan pola berikut: 5, 10, 15, 20, ..., 30. Bilangan yang hilang adalah ...",
    options: ["22", "24", "25", "26"],
    correctAnswer: "25",
    explanation: "Polanya bertambah 5 setiap langkah: 5,10,15,20,25,30. Jadi bilangan yang hilang adalah 25.",
    orderIndex: 2,
  },
  {
    id: "pola_deret-03",
    topicId: "pola_deret",
    type: "short_answer",
    difficulty: "sedang",
    prompt: "Perhatikan pola bilangan kuadrat: 1, 4, 9, 16, 25, ... Berapakah suku ke-7 dari pola tersebut?",
    options: null,
    correctAnswer: "49",
    explanation:
      "Pola ini adalah hasil kali sebuah bilangan dengan dirinya sendiri (1×1, 2×2, 3×3, dst). Suku ke-7 berarti 7×7 = 49.",
    orderIndex: 3,
  },
  {
    id: "pola_deret-04",
    topicId: "pola_deret",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Perhatikan pola berikut: 3, 6, 12, 24, ... Suku selanjutnya adalah ...",
    options: ["36", "42", "48", "54"],
    correctAnswer: "48",
    explanation: "Setiap suku adalah dua kali suku sebelumnya (dikali 2). Jadi setelah 24 adalah 24 × 2 = 48.",
    orderIndex: 4,
  },
  {
    id: "pola_deret-05",
    topicId: "pola_deret",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Perhatikan pola huruf berikut: A, C, E, G, ... Huruf selanjutnya adalah ...",
    options: ["H", "I", "J", "K"],
    correctAnswer: "I",
    explanation: "Polanya melompati satu huruf setiap kali: A (lompat B) C (lompat D) E (lompat F) G (lompat H) I.",
    orderIndex: 5,
  },
  {
    id: "pola_deret-06",
    topicId: "pola_deret",
    type: "short_answer",
    difficulty: "sulit",
    prompt: "Perhatikan pola berikut: 2, 5, 11, 23, 47, ... Berapakah suku selanjutnya?",
    options: null,
    correctAnswer: "95",
    explanation:
      "Aturannya: kalikan suku sebelumnya dengan 2, lalu tambah 1 (2×2+1=5, 5×2+1=11, 11×2+1=23, 23×2+1=47). Jadi suku selanjutnya adalah 47×2+1 = 95.",
    orderIndex: 6,
  },

  // GEOMETRI
  {
    id: "geometri-01",
    topicId: "geometri",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Bangun datar yang memiliki 3 sisi disebut ...",
    options: ["persegi", "segitiga", "lingkaran", "persegi panjang"],
    correctAnswer: "segitiga",
    explanation: "Bangun datar dengan 3 sisi dan 3 sudut disebut segitiga.",
    orderIndex: 1,
  },
  {
    id: "geometri-02",
    topicId: "geometri",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Sebuah persegi memiliki panjang sisi 5 cm. Keliling persegi tersebut adalah ...",
    options: ["15 cm", "20 cm", "25 cm", "10 cm"],
    correctAnswer: "20 cm",
    explanation: "Keliling persegi = 4 × sisi = 4 × 5 cm = 20 cm.",
    orderIndex: 2,
  },
  {
    id: "geometri-03",
    topicId: "geometri",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Luas persegi panjang dengan panjang 8 cm dan lebar 5 cm adalah ...",
    options: ["13 cm²", "26 cm²", "35 cm²", "40 cm²"],
    correctAnswer: "40 cm²",
    explanation: "Luas persegi panjang = panjang × lebar = 8 cm × 5 cm = 40 cm².",
    orderIndex: 3,
  },
  {
    id: "geometri-04",
    topicId: "geometri",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Keliling sebuah segitiga sama sisi dengan panjang sisi 7 cm adalah ...",
    options: ["14 cm", "18 cm", "21 cm", "24 cm"],
    correctAnswer: "21 cm",
    explanation: "Segitiga sama sisi memiliki 3 sisi yang sama panjang, jadi kelilingnya = 3 × 7 cm = 21 cm.",
    orderIndex: 4,
  },
  {
    id: "geometri-05",
    topicId: "geometri",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Bangun datar yang semua sisinya sama panjang dan memiliki 4 sudut siku-siku disebut ...",
    options: ["belah ketupat", "persegi", "layang-layang", "jajar genjang"],
    correctAnswer: "persegi",
    explanation:
      "Belah ketupat juga punya sisi sama panjang, tapi sudutnya belum tentu siku-siku. Bangun dengan sisi sama panjang DAN 4 sudut siku-siku adalah persegi.",
    orderIndex: 5,
  },
  {
    id: "geometri-06",
    topicId: "geometri",
    type: "short_answer",
    difficulty: "sulit",
    prompt:
      "Sebuah taman berbentuk persegi panjang memiliki keliling 36 m. Jika panjangnya 10 m, berapa meter lebar taman tersebut?",
    options: null,
    correctAnswer: "8",
    explanation:
      "Keliling = 2 × (panjang + lebar), jadi 36 = 2 × (10 + lebar). Bagi 36 dengan 2 = 18, artinya panjang + lebar = 18. Karena panjang = 10, maka lebar = 18 − 10 = 8 m.",
    orderIndex: 6,
  },

  // PENGUKURAN
  {
    id: "pengukuran-01",
    topicId: "pengukuran",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "2 jam sama dengan ... menit.",
    options: ["100 menit", "110 menit", "120 menit", "150 menit"],
    correctAnswer: "120 menit",
    explanation: "1 jam = 60 menit, jadi 2 jam = 2 × 60 menit = 120 menit.",
    orderIndex: 1,
  },
  {
    id: "pengukuran-02",
    topicId: "pengukuran",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "3 kg sama dengan ... gram.",
    options: ["300 gram", "3.000 gram", "30.000 gram", "30 gram"],
    correctAnswer: "3.000 gram",
    explanation: "1 kg = 1.000 gram, jadi 3 kg = 3 × 1.000 gram = 3.000 gram.",
    orderIndex: 2,
  },
  {
    id: "pengukuran-03",
    topicId: "pengukuran",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "2,5 meter sama dengan ... cm.",
    options: ["25 cm", "205 cm", "250 cm", "2.500 cm"],
    correctAnswer: "250 cm",
    explanation: "1 meter = 100 cm, jadi 2,5 meter = 2,5 × 100 cm = 250 cm.",
    orderIndex: 3,
  },
  {
    id: "pengukuran-04",
    topicId: "pengukuran",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "Sebuah perjalanan dimulai pukul 07.15 dan selesai pukul 09.00. Lama perjalanan tersebut adalah ...",
    options: ["1 jam 15 menit", "1 jam 30 menit", "1 jam 45 menit", "2 jam"],
    correctAnswer: "1 jam 45 menit",
    explanation: "Dari 07.15 ke 08.15 adalah 1 jam. Dari 08.15 ke 09.00 adalah 45 menit. Total = 1 jam 45 menit.",
    orderIndex: 4,
  },
  {
    id: "pengukuran-05",
    topicId: "pengukuran",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt: "1,5 liter + 750 ml = ... ml.",
    options: ["2.000 ml", "2.250 ml", "2.500 ml", "1.750 ml"],
    correctAnswer: "2.250 ml",
    explanation: "1,5 liter = 1.500 ml. Jadi 1.500 ml + 750 ml = 2.250 ml.",
    orderIndex: 5,
  },
  {
    id: "pengukuran-06",
    topicId: "pengukuran",
    type: "short_answer",
    difficulty: "sulit",
    prompt:
      "Andi berangkat sekolah pukul 06.40 dan tiba di sekolah setelah menempuh perjalanan selama 35 menit. Pukul berapa Andi tiba di sekolah? (tulis dalam format jam.menit, contoh: 07.15)",
    options: null,
    correctAnswer: "07.15",
    explanation:
      "Dari pukul 06.40, tambahkan 20 menit dulu supaya menjadi jam bulat: 06.40 + 20 menit = 07.00. Sisa waktunya 35 − 20 = 15 menit. Jadi 07.00 + 15 menit = 07.15.",
    orderIndex: 6,
  },

  // CERITA & LOGIKA
  {
    id: "cerita_logika-01",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Ani mempunyai 24 permen. Ia memberikan 9 permen kepada temannya. Sisa permen Ani sekarang adalah ...",
    options: ["13", "14", "15", "16"],
    correctAnswer: "15",
    explanation: "Sisa permen = 24 − 9 = 15.",
    orderIndex: 1,
  },
  {
    id: "cerita_logika-02",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Dalam sebuah kelas terdapat 18 siswa laki-laki dan 15 siswa perempuan. Jumlah seluruh siswa di kelas tersebut adalah ...",
    options: ["30", "32", "33", "35"],
    correctAnswer: "33",
    explanation: "Jumlah seluruh siswa = 18 + 15 = 33.",
    orderIndex: 2,
  },
  {
    id: "cerita_logika-03",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "mudah",
    prompt: "Sebuah toko memiliki 6 kotak pensil, setiap kotak berisi 12 pensil. Jumlah seluruh pensil adalah ...",
    options: ["62", "68", "72", "82"],
    correctAnswer: "72",
    explanation: "Jumlah seluruh pensil = 6 × 12 = 72.",
    orderIndex: 3,
  },
  {
    id: "cerita_logika-04",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt:
      "Umur Budi 3 tahun lebih tua dari umur adiknya. Jika jumlah umur mereka berdua adalah 19 tahun, berapa umur Budi?",
    options: ["8 tahun", "9 tahun", "11 tahun", "13 tahun"],
    correctAnswer: "11 tahun",
    explanation:
      "Misalkan umur adik = a, maka umur Budi = a + 3. Jumlahnya: a + (a+3) = 19, sehingga 2a = 16, a = 8. Umur Budi = 8 + 3 = 11 tahun.",
    orderIndex: 4,
  },
  {
    id: "cerita_logika-05",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "sedang",
    prompt:
      "Sebuah bus dapat memuat 45 penumpang. Ada 3 bus yang sudah penuh terisi dan 1 bus lagi baru terisi 20 penumpang. Berapa jumlah seluruh penumpang?",
    options: ["145", "155", "165", "175"],
    correctAnswer: "155",
    explanation: "3 bus penuh = 3 × 45 = 135 penumpang. Ditambah bus keempat yang berisi 20 penumpang: 135 + 20 = 155.",
    orderIndex: 5,
  },
  {
    id: "cerita_logika-06",
    topicId: "cerita_logika",
    type: "short_answer",
    difficulty: "sedang",
    prompt:
      "Rina membeli 4 buku seharga Rp3.500 per buku dan 2 pensil seharga Rp1.250 per pensil. Berapa total uang yang harus dibayar Rina (dalam rupiah, tulis angka saja)?",
    options: null,
    correctAnswer: "16500",
    explanation:
      "Harga 4 buku = 4 × Rp3.500 = Rp14.000. Harga 2 pensil = 2 × Rp1.250 = Rp2.500. Totalnya = Rp14.000 + Rp2.500 = Rp16.500.",
    orderIndex: 6,
  },
  {
    id: "cerita_logika-07",
    topicId: "cerita_logika",
    type: "multiple_choice",
    difficulty: "sulit",
    prompt:
      "Tiga anak, yaitu Dedi, Eka, dan Fani, dibandingkan tinggi badannya. Dedi lebih tinggi dari Eka. Fani lebih pendek dari Eka. Urutan dari yang tertinggi ke yang terpendek adalah ...",
    options: [
      "Dedi, Eka, Fani",
      "Eka, Dedi, Fani",
      "Fani, Eka, Dedi",
      "Dedi, Fani, Eka",
    ],
    correctAnswer: "Dedi, Eka, Fani",
    explanation:
      "Dedi lebih tinggi dari Eka, artinya Dedi > Eka. Fani lebih pendek dari Eka, artinya Eka > Fani. Jadi urutannya: Dedi > Eka > Fani.",
    orderIndex: 7,
  },
  {
    id: "cerita_logika-08",
    topicId: "cerita_logika",
    type: "short_answer",
    difficulty: "sulit",
    prompt:
      "Sebuah kandang berisi ayam dan kambing. Jumlah kepala seluruhnya 10 dan jumlah kaki seluruhnya 32. Ayam berkaki 2 dan kambing berkaki 4. Berapa jumlah kambing?",
    options: null,
    correctAnswer: "6",
    explanation:
      "Jika semua 10 hewan adalah ayam, jumlah kaki = 10 × 2 = 20 kaki. Kekurangannya dari 32 adalah 32 − 20 = 12 kaki. Setiap kambing punya 2 kaki lebih banyak dari ayam, jadi jumlah kambing = 12 ÷ 2 = 6. Cek: 6 kambing + 4 ayam = 10 kepala, kakinya 6×4 + 4×2 = 24+8 = 32. Benar.",
    orderIndex: 8,
  },
];
