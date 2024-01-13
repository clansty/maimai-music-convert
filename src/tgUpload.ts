import { XMLParser } from "fast-xml-parser"
import fsP from "fs/promises"
import fs from "fs"
import path from "path"
import TelegramBot from "node-telegram-bot-api"

const MUSIC_IDS = "000000 000001 000008 000009 000017 000018 000022 000023 000024 000025 000027 000030 000031 000035 000038 000040 000042 000044 000046 000047 000053 000056 000058 000061 000062 000063 000064 000065 000066 000067 000068 000069 000070 000071 000073 000075 000076 000077 000078 000079 000080 000081 000082 000083 000084 000085 000100 000101 000102 000106 000107 000108 000109 000110 000111 000112 000113 000114 000115 000116 000117 000118 000119 000120 000121 000122 000125 000128 000130 000131 000132 000133 000134 000135 000136 000137 000138 000139 000140 000141 000142 000143 000144 000145 000146 000147 000152 000153 000154 000155 000157 000159 000181 000184 000185 000186 000187 000188 000189 000190 000191 000192 000193 000194 000198 000199 000200 000201 000202 000203 000204 000205 000206 000207 000208 000209 000212 000213 000214 000216 000217 000218 000219 000220 000223 000224 000225 000226 000227 000228 000229 000230 000231 000232 000233 000234 000235 000236 000237 000238 000239 000240 000241 000242 000244 000246 000247 000248 000251 000252 000253 000254 000255 000256 000258 000259 000260 000261 000262 000263 000264 000265 000266 000267 000268 000269 000270 000271 000278 000280 000281 000282 000283 000284 000285 000288 000289 000290 000291 000293 000295 000296 000297 000298 000299 000300 000301 000302 000303 000305 000308 000309 000310 000311 000312 000313 000314 000315 000316 000318 000319 000320 000321 000322 000323 000324 000325 000326 000327 000328 000329 000330 000331 000332 000337 000339 000341 000342 000343 000344 000345 000346 000347 000348 000349 000351 000352 000353 000359 000360 000362 000363 000364 000365 000366 000367 000374 000375 000376 000378 000379 000380 000381 000382 000383 000384 000385 000386 000387 000388 000389 000390 000399 000400 000401 000403 000404 000407 000408 000409 000410 000411 000412 000413 000414 000417 000418 000419 000420 000421 000422 000424 000425 000426 000427 000431 000432 000434 000435 000436 000437 000438 000439 000440 000446 000447 000448 000449 000451 000453 000454 000455 000456 000457 000458 000459 000460 000461 000462 000463 000464 000465 000466 000467 000468 000471 000472 000477 000480 000482 000483 000488 000490 000492 000493 000494 000495 000496 000497 000506 000507 000508 000509 000510 000511 000512 000513 000514 000515 000516 000517 000518 000519 000520 000521 000523 000524 000525 000526 000527 000528 000529 000530 000531 000532 000533 000534 000535 000536 000537 000538 000539 000540 000541 000542 000543 000546 000547 000548 000552 000553 000555 000556 000557 000558 000559 000560 000561 000564 000565 000566 000567 000568 000571 000572 000573 000574 000578 000579 000580 000581 000582 000583 000584 000585 000586 000587 000589 000592 000593 000598 000599 000601 000602 000603 000606 000610 000611 000612 000613 000614 000617 000618 000620 000621 000622 000624 000625 000626 000627 000628 000629 000630 000631 000632 000634 000636 000637 000639 000640 000641 000642 000643 000647 000648 000649 000650 000654 000655 000657 000658 000659 000663 000664 000665 000666 000668 000669 000670 000672 000673 000674 000675 000676 000677 000678 000679 000680 000681 000682 000683 000684 000687 000688 000689 000690 000691 000692 000693 000694 000695 000696 000697 000698 000699 000700 000701 000702 000704 000705 000706 000707 000708 000709 000710 000711 000712 000713 000717 000719 000720 000721 000722 000723 000725 000726 000731 000732 000733 000734 000735 000736 000737 000738 000739 000740 000741 000742 000743 000745 000746 000747 000748 000750 000751 000752 000753 000756 000757 000758 000759 000760 000761 000762 000763 000764 000765 000766 000767 000768 000769 000770 000771 000772 000773 000775 000776 000777 000778 000779 000781 000782 000786 000787 000789 000790 000791 000792 000793 000794 000796 000797 000798 000799 000800 000801 000802 000803 000804 000805 000806 000807 000809 000810 000811 000812 000815 000816 000817 000818 000819 000820 000821 000822 000823 000825 000826 000827 000829 000830 000831 000832 000833 000834 000835 000836 000837 000838 000839 000840 000841 000842 000844 000847 000848 000849 000850 000852 000853 001001 001002 001003 001004 001005 001006 001007 001008 001009 001010 001014 001015 001016 001017 001018 001019 001020 001021 001022 001023 001024 001025 001026 001027 001028 001029 001030 001031 001032 001034 001037 001043 001044 001046 001048 001049 001050 001051 001052 001058 001059 001060 001061 001064 001065 001066 001067 001069 001070 001073 001075 001077 001078 001080 001081 001083 001084 001085 001086 001087 001088 001089 001090 001091 001092 001093 001094 001095 001096 001097 001098 001099 001100 001101 001102 001103 001104 001105 001106 001107 001108 001109 001110 001111 001113 001115 001118 001119 001121 001122 001123 001124 001125 001126 001127 001128 001129 001130 001131 001132 001133 001134 001135 001136 001137 001138 001139 001140 001141 001142 001143 001145 001146 001147 001148 001149 001150 001152 001153 001154 001155 001156 001157 001158 001159 001160 001161 001162 001163 001164 001165 001166 001167 001168 001169 001170 001171 001172 001173 001174 001175 001176 001177 001183 001184 001185 001186 001187 001188 001189 001190 001191 001192 001193 001194 001195 001197 001198 001199 001200 001201 001202 001204 001205 001206 001207 001208 001209 001210 001211 001212 001213 001214 001215 001216 001218 001219 001221 001222 001223 001224 001225 001226 001227 001228 001229 001230 001231 001232 001233 001234 001235 001236 001237 001238 001239 001240 001241 001242 001243 001246 001247 001248 001249 001253 001255 001258 001260 001261 001262 001263 001264 001265 001266 001267 001268 001269 001270 001271 001272 001273 001274 001275 001276 001277 001278 001279 001280 001281 001282 001283 001284 001285 001286 001287 001288 001289 001290 001291 001292 001293 001294 001295 001296 001297 001298 001299 001300 001301 001302 001303 001304 001305 001306 001307 001308 001309 001310 001311 001312 001313 001314 001315 001316 001317 001318 001319 001321 001322 001323 001324 001325 001327 001328 001329 001330 001331 001333 001334 001335 001336 001337 001340 001341 001342 001343 001344 001345 001346 001347 001348 001349 001350 001351 001352 001353 001354 001355 001356 001358 001359 001360 001361 001362 001363 001364 001365 001367 001369 001370 001371 001372 001373 001374 001375 001376 001377 001378 001379 001380 001381 001382 001383 001384 001385 001386 001387 001388 001389 001390 001391 001392 001393 001394 001395 001396 001398 001399 001400 001401 001402 001404 001405 001406 001407 001408 001409 001410 001411 001412 001413 001415 001418 001419 001420 001421 001422 001423 001424 001425 001426 001427 001428 001429 001430 001431 001432 001433 001434 001435 001436 001437 001438 001439 001441 001443 001444 001445 001446 001447 001448 001449 001450 001451 001452 001453 001454 001455 001456 001457 001458 001459 001460 001461 001462 001463 001464 001465 001466 001467 001468 001469 001470 001471 001472 001473 001474 001475 001477 001478 001479 001480 001481 001482 001483 001484 001485 001486 001487 001488 001489 001490 001491 001492 001493 001494 001495 001496 001497 001498 001499 001500 001501 001502 001503 001504 001505 001506 001507 001508 001509 001510 001511 001512 001513 001514 001516 001517 001518 001519 001520 001521 001523 001524 001525 001526 001527 001528 001529 001530 001532 001533 001534 001535 001536 001537 001538 001539 001540 001541 001542 001543 001544 001545 001546 001547 001548 001549 001550 001551 001552 001553 001554 001555 001556 001557 001558 001559 001560 001561 001562 001563 001564 001565 001566 001567 001568 001569 001570 001571 001572 001573 001574 001575 001576 001577 001578 001580 001583 001584 001585 001586 001587 001588 001589 001590 001591 001592 001593 001594 001596 001597 001598 001599 001600 001601 001602 001603 001604 001605 001606 001607 001608 001609 001610 001611 001612 001613 001614 001615 001616 001617 001618 001619 001620 001621 001622 001623 001624 001625 001626 001627 001628 001629 001630 001631 001632 001633 001634 001635 001636 001637 001638 001639 001640 001641 001642 001643 001644 001650 001651 001652 001653 001654 001655 001656 001657 001658 001659 001660 001664 001665 001666 001667 001668".split(" ")
const XML_BASE_DIR = "/Volumes/Shares/A000/music"
const MUSIC_BASE_DIR = "/Volumes/Shares/Music/maimai-music-buddies/raw"
const IMAGE_BASE_DIR = "/Volumes/Shares/A000/AssetBundleImages/output/Sprite"
const TARGET_BASE_DIR = "/Volumes/Shares/Music/maimai-music-buddies"
const CHAT_ID = -1002047144070

  ;
(async () => {
  const bot = new TelegramBot("1232351705:AAGYAgiZP0xE1sbnMSG0c0tNYKEkIftIP3E", {
    polling: false,
  });

  for (const id of MUSIC_IDS) {
    if (Number(id) <= 240) continue
    console.log(id)
    let xmlFile = path.join(XML_BASE_DIR, `music${id}`, "Music.xml")
    if (!fs.existsSync(xmlFile)) {
      xmlFile = path.join(XML_BASE_DIR, `music0${Number(id) + 10000}`, "Music.xml")
      // What is SBGA doing
      if (!fs.existsSync(xmlFile)) {
        console.log(id, "XML not found")
        continue
      }
    }

    const file = await fsP.readFile(xmlFile, "utf-8")
    const parser = new XMLParser();
    const meta = parser.parse(file) as {
      MusicData: {
        dataName: 'music000008',
        netOpenName: { id: 0, str: 'Net190711' },
        releaseTagName: { id: 1, str: 'Ver1.00.00' },
        disable: false,
        name: { id: 8, str: 'True Love Song' },
        rightsInfoName: { id: 0, str: '' },
        sortName: 'TRUELOVESONG',
        artistName: { id: 111, str: 'Kai/クラシック「G線上のアリア」' },
        genreName: { id: 105, str: 'maimai' },
        bpm: 150,
        version: 10000,
        AddVersion: { id: 0, str: 'maimai' },
        movieName: { id: 8, str: 'True Love Song' },
        cueName: { id: 8, str: 'True Love Song' },
        dresscode: false,
        eventName: { id: 1, str: '無期限常時解放' },
        eventName2: { id: 0, str: '解放なし' },
        subEventName: { id: 0, str: '解放なし' },
        lockType: 0,
        subLockType: 1,
        dotNetListView: true,
        notesData: { Notes: [] },
        utageKanjiName: '',
        comment: '',
        utagePlayStyle: 0,
        fixedOptions: { FixedOption: [] },
        jacketFile: '',
        thumbnailName: '',
        rightFile: '',
        priority: 0
      }
    };

    const tags = [meta.MusicData.genreName.str, meta.MusicData.AddVersion.str]
    const difficultyTags = new Set(meta.MusicData.notesData.Notes.map((it: any) => it.level))

    difficultyTags.delete(0)

    const result = await bot.sendAudio(CHAT_ID, path.join(TARGET_BASE_DIR, "all", `${toFileName(meta.MusicData.name.str)}.m4a`), {
      title: meta.MusicData.name.str,
      performer: meta.MusicData.artistName.str,
      // @ts-ignore
      thumb: path.join(IMAGE_BASE_DIR, `UI_Jacket_${id}.png`),
      caption: tags.join(" ") + "\n" + Array.from(difficultyTags).join(" ")
    });

    console.log(result)
  }
})()

function toFileName(songName: string | 39) {
  return songName.toString()
    .replaceAll("'", "")
    .replaceAll("\"", "")
    .replaceAll("\\", "")
    .replaceAll("/", "")
    .replaceAll("#", "")
}

function escape(text: string | number) {
  return text.toString()
    .replaceAll("\\", "\\\\")
    .replaceAll("\"", "\\\"")
    .replaceAll("$", "\\$")
    .replaceAll("`", "\\`")
}