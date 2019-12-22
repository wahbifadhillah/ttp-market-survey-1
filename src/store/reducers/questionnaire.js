import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import daily from '../../assets/images/daily.svg';
import weekly from '../../assets/images/weekly.svg';
import monthly from '../../assets/images/monthly.svg';

const initialState = {
    answers: [],
    question: {
        0: {
            question: "Apa kamu biasa melakukan perencanaan (planning) dan menjadwalkan kegiatan sehari-hari mu?",
            type: "yesno",
        },
        1: {
            question: "Dari media yang tertera dibawah, yang mana yang kamu rasa paling membantu kegiatan planningmu?",
            type: "multiple",
            options: [
            'Kalender smartphone',
            'Kalender kertas/ dinding',
            'Notebook/ Buku catatan/ Jurnal',
            'Planner',
            'Aplikasi smartphone (misalkan Evernote, Notion, Trello, dll)',
            'Diingat di kepala saja',
            'Tidak ada'
            ]
        },
        2: {
            question: "Buat kamu yang tidak biasa planning, kira-kira apa sih alasannya?",
            type: "multiple",
            options: [
            'Pekerjaan/ tugas saya sedikit, jadi diingat-ingat saja cukup',
            'Planning terlalu ribet',
            'Tidak terbiasa',
            'Tidak cocok planning karena gampang bosan/ tidak konsisten',
            'Saya pakai planner'
            ]
        },
        3: {
            question: "Kalau kamu sudah aktif menggunakan planner, kira-kira ekspektasi apa sih yang kamu harap akan tercapai?",
            type: "input",
            options: [
            'Hidup menjadi lebih teratur',
            'Memiliki prioritas yang pasti',
            'Lebih produktif setiap harinya',
            'Membangun kebiasaan positif (habitual process)',
            'Goals akan dengan mudah tercapai',
            true
            ]
        },
        4: {
            question: "Apakah kamu terbiasa menuliskan to-do list?",
            type: "yesno",
        },
        5: {
            question: "Di media apa sih kamu biasa menuliskan to-do list?*",
            type: "input",
            options: [
            'Google Keep',
            'Kalendar',
            'Planner',
            'Notebook/ Buku catatan',
            'Sticky notes',
            'Aplikasi smartphone',
            'Diingat dikepala saja',
            true
            ]
        },
        6: {
            question: "Apakah kamu selalu merasa sibuk dan lelah?",
            type: "multiple",
            options: [
            'Ya, tugas saya padat. Saya sering merasa sangat lelah saat pulang kerja/ kuliah/ sekolah',
            'Ya, tapi saya merasa enjoy saja',
            'Tidak. Saya melakukan sesuatu dengan pas sesuai dengan kemampuan saya',
            'Tidak. Saya tidak memiliki banyak kegiatan'
            ]
        },
        7: {
            question: "Apakah kamu sudah merasa produktif?",
            type: "multiple",
            options: [
            'Tidak tahu. Saya ini sibuk atau produktif ya?',
            'Saya masih bingung menentukan prioritas, yang penting semua saya kerjakan',
            'Sudah, saya sudah tahu skala prioritas mana saja yang harus segera dikerjakan maupun dijadwalkan. Saya sudah ahli mengatasi burnout (keteteran)',
            'Sudah, tapi terkadang saya mesih merasa teramat lelah di penghujung hari'
            ]
        },
        8: {
            question: "Kira-kira pernyataan seperti apa sih yang paling pas menggambarkan persoalan produktifitas mu setiap hari?",
            type: "multiple",
            options: [
            'Tidak ada masalah, saya cukup senang dengan tingkat keproduktifitasan saya sekarang',
            'Saya terlalu banyak rebahan',
            'Saya terlalu sibuk dan overwork sampai lupa istirahat',
            'Saya cukup produktif, tapi terkadang saya lupa menyeimbangkan kehidupan pribadi dan pekerjaan',
            'Saya rasa saya kurang produktif, setiap hari saya bingung harus mengerjakan apa',
            'Pikiran saya gampang teralihkan (distracted) sehingga pekerjaan saya tidak cepat selesai',
            'Saya mudah sekali menunda-nunda pekerjaan'
            ]
        },
        9: {
            question: "Coba urutkan 7 masalah dibawah mulai dari yang kamu anggap paling urgent sampai yang kurang kamu anggap penting",
            type: "priority",
            // priority
            options: [
            ['1', 'Saya ingin menjadi produktif namun tidak tahu dari mana'],
            ['2', 'Saya ingin tahu bagaimakan cara manajemen waktu yang benar'],
            ['3', 'Saya ingin agar saya bisa menentukan skala prioritas'],
            ['4', 'Saya ingin membentuk kebiasaan yang benar agar saya bisa produktif secara konsisten'],
            ['5', 'Saya butuh motivasi agar saya konsisten melalukan planning setiap hari'],
            ['6', 'Saya ingin menyeimbangkan kehidupan profesional (pekerja/pelajar) dengan kehidupan pribadi saya'],
            ['7', 'Saya ingin bisa fokus dalam menyelesaikan pekerjaan saya dan meminimalisir distraction']
            ]
        },
        10: {
            question: "Mengapa kamu ingin memperbaiki tingkat produktifitasmu?*",
            type: "input",
            options: [
            'Saya rasa menjadi produktif akan sangat membantu karir dan masa depan saya nantinya',
            'Saya tidak ingin melakukan banyak hal namun tidak ada hasilnya',
            'Saya ingin tahu bagaimana memanfaatkan kemampuan saya dengan maksimal',
            'Bukan meningkatkan, namun saya ingin menjaga tingkat produktifitas saya seperti sekarang',
            true
            ]
        },
        11: {
            question: "Media apa sih yang lebih kamu pilih untuk planning?",
            type: "multiple",
            options: [
                'Aplikasi smartphone',
                'Kertas'
            ]
        },
        12: {
            question: "Jenis planner apa yang kamu rasa paling pas untuk planning dan menuliskan jadwal keseharianmu?",
            type: "optimage",
            options: [
            [monthly, 'Monthly Planner'],
            [weekly, 'Weekly Planner'],
            [daily, 'Daily Planner']
            ]
        },
        13: {
            question: "Apa kamu pernah membeli planner book sebelumnya?",
            type: "yesno",
        },
        14: {
            question: "Dengan kisaran harga berapa sih kamu mendapatkan produk tersebut?",
            type: "multiple",
            options: [
                '< Rp 50.000',
                'Rp 50.000 – Rp 100.000',
                'Rp 100.000 – Rp 150.000',
                'Rp 150.000 – Rp 200.000',
                '> Rp. 200.000'
            ]
        },
        15: {
            question: "Apa produk tersebut sudah sesuai dengan kebutuhanmu?",
            type: "multiple",
            options: [
                'Ya',
                'Tidak',
                'Tidak Terlalu'
            ]
        },
        16: {
            question: "Apa kamu bersedia membayar jika ada media yang efektif untuk membentuk kebiasaan baik dan memperbaiki tingkat produktifitasmu?",
            type: "multiple",
            options: [
                'Ya',
                'Kalau bisa gratis saja',
                'Tergantung harga'
            ]
        },
        17: {
            question: "Untuk sebuah produk yang bisa membantumu untuk tetap konsisten dalam menjadi produktif, mana dari daftar harga di bawah ini yang layak dan pas untuk kantongmu?*",
            type: "multiple",
            options: [
                '< Rp 50.000',
                'Rp 50.000 – Rp 100.000',
                'Rp 100.000 – Rp 150.000',
                'Rp 150.000 – Rp 200.000',
                '> Rp. 200.000'
            ]
        },
    },
    questionPos: 0
}

const nextFormQuestion = (state, action) => {
  return updateObject(state, {
    questionPos: action.oldPos+1
  })
}

const prevFormQuestion = (state, action) => {
  return updateObject(state, {
    questionPos: action.oldPos-1
  })
}

const setAnswersQuestion = (state, action) => {
    return updateObject(state, {
      answers: action.answers
    })
  }

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.NEXT_FORM_QUESTION: return nextFormQuestion(state, action);
        case actionTypes.PREV_FORM_QUESTION: return prevFormQuestion(state, action);
        case actionTypes.SET_QUESTION_ANSWERS: return setAnswersQuestion(state, action);
        // case actionTypes.SET_FORM_REGISTER_VALUE: return setFormRegisterValue(state, action);
        default: return state;
    }
}

export default reducer;