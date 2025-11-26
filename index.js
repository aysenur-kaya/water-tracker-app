 //STEP 1: DOM ELEMANLARINI SEÇELİM
    const goalInput =document.getElementById('goalInput');
    const setGoalBtn =document.getElementById('setGoalBtn');
    const currentAmountText =document.getElementById('currentAmount');
    const progressContainer =document.getElementById('progressContainer');
    const progressBar =document.getElementById('progressBar');
    const addWaterBtn =document.getElementById('addWaterBtn');
    const resetBtn =document.getElementById('resetBtn');
    const historyList = document.getElementById('historyList');
    const message =document.getElementById('message');


    //STEP 2:  LocalStorage'dan VERİ YÜKLE


    const savedGoal = localStorage.getItem('dailyGoal');
    const savedAmount = localStorage.getItem('currentAmount');


    //STEP 3: STATE(veri)
     let dailyGoal = savedGoal ? Number(savedGoal) : 0;
    let currentAmount = savedAmount ? Number(savedAmount) : 0;

    //history yükleme
    let history = JSON.parse(localStorage.getItem('history')) || [];



     //STEP 3,5 :eğer veri varsa ekrana uygula
     if(savedGoal) {
      goalInput.value =savedGoal;
      }

      if(savedAmount) {
        currentAmount =Number(savedAmount);
        currentAmountText.textContent= savedAmount;
        updateProgress();
      }



      //RANDOM MOTİVASYON MESAJLARI
      const motivationMessages = [
        'az az ilerlemek de ilerlemektir',
        'hedefine çok yaklaştın,devam et',
        'bugün kendin için bir şey yap',
        'disiplin = özgürlük',
        'her yudum sağlığın için',
        'bırakma,ilerliyosun',
        'vücüdun sana teşekkür edecek',
        'motivasyon değil, disiplin kazan',
        'Sen bugünü değil, geleceğini şekillendiriyorsun!',
        'Harika gidiyorsun, devam et!'
      ];

      function getRandomMotivation() {
        const index = Math.floor(Math.random() *motivationMessages.length);
        return motivationMessages[index];
      }



      // history i ekrana yazdırma

      function renderHistory() {
      const historyList = document.getElementById('historyList')  ;
      historyList.innerHTML ='';

      history.forEach (item => {
        const li = document.createElement('li');
        li.textContent= `${item.date} - Hedef: ${item.goal} ml, içilen: ${item.drank} ml`;
        historyList.appendChild(li);
      });
      }

      renderHistory();


       //STEP 4: updateProgress() Fonksiyonu
    function updateProgress() {
  let percent = (currentAmount / dailyGoal) * 100;
  progressBar.style.width = percent + "%";

  
}


   

    //STEP 5: 'hedefi kaydet' Butonunun Mantığı 


    setGoalBtn.addEventListener('click', function() { 

    dailyGoal = Number(goalInput.value);

    if(dailyGoal <= 0) {
      message.textContent = 'Lütfen geçerli bir hedef yaz!';
      return;
    }


    currentAmount = 0;
    currentAmountText.textContent =0;
    progressBar.style.width = '0%';
    message.textContent ='';

  // Hedef kaydedildi → LocalStorage'a yaz
  localStorage.setItem('dailyGoal', dailyGoal);
  localStorage.setItem('currentAmount', currentAmount);

    });


    //STEP 6: +200 ml Su ekleme işlemi

    addWaterBtn.addEventListener('click', function() {

      currentAmount +=200;   // a)200 ml ekle

      currentAmountText.textContent = currentAmount;  //b)ekrandaki yazıyı güncelle

     updateProgress();


      //c) hedefe ulaşıldı mı?
      if(currentAmount >= dailyGoal) {
        message.textContent = '!TEBRİKLER! Hedefi Tamamladın.'
      }else {
        message.textContent = getRandomMotivation();
      }


      // LocalStorage'a yaz
      localStorage.setItem('currentAmount', currentAmount);
      });



      //STEP 7: RESET BUTONU

      resetBtn.addEventListener('click',function() {



         //gün bitmeden önce geçmişi, kaydet 
        history.push({
          date: new Date().toLocaleDateString(),
          goal: dailyGoal,
          drank:currentAmount
        });


        //yeni history i localstorage a kaydet
        localStorage.setItem('history',JSON.stringify(history));


        //veriyi sıfırla
        currentAmount=0;
        dailyGoal= 0;

        currentAmountText.textContent =0;
        goalInput.value ='';
        progressBar.style.width = '0%';
        message.textContent = '';

        // Güncel history listesini ekrana yazdır
        renderHistory();


        //localStorage tamamen temizlensin
        localStorage.removeItem('dailyGoal');
        localStorage.removeItem('currentAmount');
      });