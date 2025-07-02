>>> at.[id,ja,en] default.id

Bandung merupakan salah satu kota di Indonesia yang populer di berbagai kalangan.

Selain tata kota yang baik dan sejuk, banyak tempat wisata yang menarik untuk dikunjungi.

Berbagai cita rasa kuliner juga bisa kamu temukan di Bandung.

Tak kalah lagi, Bandung mengimplementasikan edukasi serta teknologi yang maju.

> show.miyo

Miyo menjadi salah satu binatang yang tertarik dengan suasana kota Bandung.

Miyo merupakan seekor kucing yang berasal dari pulau tak dikenal.

Dengan langkah keempat kakinya, Miyo ingin mengeksplorasi dunia luar dan bertemu dengan binatang-binatang lainnya.

Namun, alasan Miyo pergi ke Bandung karena ada tempat kursus pembelajaran bahasa Jepang yang menjadi destinasi impian Miyo.

> show.gedung

Tempat kursus bahasa Jepang itu bernama ....

Di sana, berbagai macam binatang berkumpul untuk menekuni bahasa dan kebudayaan Jepang.

Selain itu, tempat kursus itu juga dijadikan komunitas pecinta bahasa Jepang.

> hide.gedung

Matahari mulai menuju puncak. Miyo pun bergegas ke tempat tersebut.

> hide.miyo-fadeout-bg.taman-fadein-

zoe(?)++ Hai, kamu yang di sana.
@ja+ やあ、そこの:rb[君(きみ)]
__

Mendengar sahutan tersebut, Miyo membalikkan badannya.

> show.zoe-

zoe(?)-- Kamu anak baru di sini?

>> choice.pick

    Iya

zoe(?)-- He, kalau begitu selamat datang.

    Bukan

> zoe.sweating

zoe(?)-- Masa? Soalnya kamu terlihat kebingungan.

>> choice.end

zoe++ Perkenalkan, nama saya Zoe.
@ja+ はじめまして。ぼくのなはゾエ。
__

zoe++ Saya merupakan salah satu murid di tempat kursus ini.
@ja+ ゾエはこのコオスのがくせいです。
__

zoe++ Kalau nama kamu?
@ja+ そちらのなまえは？
__

> sfx.nyaa-

zoe++ Miyo, ya? Kalau begitu, senang berkenalan denganmu.
@ja+ ミヨですか？それじゃ、よろしく。
__

... 
<!-- TODO -->

zoe-- Oh, itu ya. Kalau gak salah namanya...

>> choice.pick

    Taman Kita

> pia.sad

pia-- Itu mah yang di belakang gedung kelas, Miyo.
pia-- _Kita_ itu artinya utara.
zoe-- Taman yang di sebelah kanan gedung, namanya Taman Higashi, kan?

> pia.happy

pia-- Nah, iya! Pia baru ingat, taman Higashi namanya.

    Taman Nishi

> pia.sad

PIA:: Itu mah yang di sebelah kiri gedung kelas, Miyo.
PIA:: _Nishi_ itu artinya barat.
ZOE:: Taman yang di sebelah kanan gedung, namanya Taman Higashi, kan?

> pia.happy

PIA:: Nah, iya! Pia baru ingat, taman Higashi namanya.

    Taman Higashi

> pia.happy

PIA:: Wah, ternyata Miyo lebih cerdas daripada Pia!
PIA:: Betul, namanya Taman Higashi. Pia baru ingat!
ZOE:: Tahu-tahu Miyo sudah bisa menghafal nama-nama teman di sini.

> sfx.nyaa-

    Taman Minami

<!-- TODO -->

>> choice.end

Yey, selesai.
