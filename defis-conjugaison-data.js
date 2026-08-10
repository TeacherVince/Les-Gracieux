/* =======================================================================
   DÉFIS — CONJUGAISON — données validées
   -----------------------------------------------------------------------
   Source : Defis-Conjugaison-Tableau-de-reference.xlsx, relu et validé
   par Vincent le 10.08.2026. Ne pas modifier une forme ici sans la
   corriger d'abord dans le tableau Excel (source de vérité).

   Chaque verbe a 4 temps. Pour présent/imparfait/futur : "forms" donne
   les 6 formes dans l'ordre [je, tu, il-elle-on, nous, vous, ils-elles].
   Pour le passé composé : pas de "forms" stockées — l'auxiliaire
   (avoir/être) et le participe passé suffisent, la forme est calculée
   à la volée par le moteur (voir defis-conjugaison-engine.js), pour
   pouvoir accorder correctement le participe des verbes en "être"
   selon le sujet réellement tiré (genre/nombre).

   "risk" (par temps) : correspond aux lignes surlignées "⚠ irrégulier"
   du tableau validé. Sert de base au mode de difficulté "difficile"
   (uniquement les exceptions).
   ======================================================================= */

window.CONJ_DATA = {
  order: ["chanter","avoir","être","aller","faire","dire","finir","entendre","savoir","vouloir",
          "aimer","oublier","manger","commencer","sortir","venir","courir","mettre","rendre","prendre","pouvoir","voir"],

  groupOf5P: ["chanter","avoir","être","aller","faire","dire","finir","entendre","savoir","vouloir"],

  verbs: {
    chanter: { groupe:"5P", tenses: {
      present:   { forms:["chante","chantes","chante","chantons","chantez","chantent"], risk:false },
      imparfait: { forms:["chantais","chantais","chantait","chantions","chantiez","chantaient"], risk:false },
      futur:     { forms:["chanterai","chanteras","chantera","chanterons","chanterez","chanteront"], risk:false },
      passeCompose: { aux:"avoir", pp:"chanté", risk:false }
    }},
    avoir: { groupe:"5P", tenses: {
      present:   { forms:["ai","as","a","avons","avez","ont"], risk:true },
      imparfait: { forms:["avais","avais","avait","avions","aviez","avaient"], risk:false },
      futur:     { forms:["aurai","auras","aura","aurons","aurez","auront"], risk:true },
      passeCompose: { aux:"avoir", pp:"eu", risk:false }
    }},
    être: { groupe:"5P", tenses: {
      present:   { forms:["suis","es","est","sommes","êtes","sont"], risk:true },
      imparfait: { forms:["étais","étais","était","étions","étiez","étaient"], risk:false },
      futur:     { forms:["serai","seras","sera","serons","serez","seront"], risk:true },
      passeCompose: { aux:"avoir", pp:"été", risk:true }
    }},
    aller: { groupe:"5P", tenses: {
      present:   { forms:["vais","vas","va","allons","allez","vont"], risk:true },
      imparfait: { forms:["allais","allais","allait","allions","alliez","allaient"], risk:false },
      futur:     { forms:["irai","iras","ira","irons","irez","iront"], risk:true },
      passeCompose: { aux:"être", pp:"allé", risk:true }
    }},
    faire: { groupe:"5P", tenses: {
      present:   { forms:["fais","fais","fait","faisons","faites","font"], risk:true },
      imparfait: { forms:["faisais","faisais","faisait","faisions","faisiez","faisaient"], risk:false },
      futur:     { forms:["ferai","feras","fera","ferons","ferez","feront"], risk:true },
      passeCompose: { aux:"avoir", pp:"fait", risk:false }
    }},
    dire: { groupe:"5P", tenses: {
      present:   { forms:["dis","dis","dit","disons","dites","disent"], risk:true },
      imparfait: { forms:["disais","disais","disait","disions","disiez","disaient"], risk:false },
      futur:     { forms:["dirai","diras","dira","dirons","direz","diront"], risk:false },
      passeCompose: { aux:"avoir", pp:"dit", risk:false }
    }},
    finir: { groupe:"5P", tenses: {
      present:   { forms:["finis","finis","finit","finissons","finissez","finissent"], risk:false },
      imparfait: { forms:["finissais","finissais","finissait","finissions","finissiez","finissaient"], risk:false },
      futur:     { forms:["finirai","finiras","finira","finirons","finirez","finiront"], risk:false },
      passeCompose: { aux:"avoir", pp:"fini", risk:false }
    }},
    entendre: { groupe:"5P", tenses: {
      present:   { forms:["entends","entends","entend","entendons","entendez","entendent"], risk:false },
      imparfait: { forms:["entendais","entendais","entendait","entendions","entendiez","entendaient"], risk:false },
      futur:     { forms:["entendrai","entendras","entendra","entendrons","entendrez","entendront"], risk:false },
      passeCompose: { aux:"avoir", pp:"entendu", risk:false }
    }},
    savoir: { groupe:"5P", tenses: {
      present:   { forms:["sais","sais","sait","savons","savez","savent"], risk:false },
      imparfait: { forms:["savais","savais","savait","savions","saviez","savaient"], risk:false },
      futur:     { forms:["saurai","sauras","saura","saurons","saurez","sauront"], risk:true },
      passeCompose: { aux:"avoir", pp:"su", risk:true }
    }},
    vouloir: { groupe:"5P", tenses: {
      present:   { forms:["veux","veux","veut","voulons","voulez","veulent"], risk:true },
      imparfait: { forms:["voulais","voulais","voulait","voulions","vouliez","voulaient"], risk:false },
      futur:     { forms:["voudrai","voudras","voudra","voudrons","voudrez","voudront"], risk:true },
      passeCompose: { aux:"avoir", pp:"voulu", risk:true }
    }},

    aimer: { groupe:"6P", tenses: {
      present:   { forms:["aime","aimes","aime","aimons","aimez","aiment"], risk:false },
      imparfait: { forms:["aimais","aimais","aimait","aimions","aimiez","aimaient"], risk:false },
      futur:     { forms:["aimerai","aimeras","aimera","aimerons","aimerez","aimeront"], risk:false },
      passeCompose: { aux:"avoir", pp:"aimé", risk:false }
    }},
    oublier: { groupe:"6P", tenses: {
      present:   { forms:["oublie","oublies","oublie","oublions","oubliez","oublient"], risk:false },
      imparfait: { forms:["oubliais","oubliais","oubliait","oubliions","oubliiez","oubliaient"], risk:true },
      futur:     { forms:["oublierai","oublieras","oubliera","oublierons","oublierez","oublieront"], risk:false },
      passeCompose: { aux:"avoir", pp:"oublié", risk:false }
    }},
    manger: { groupe:"6P", tenses: {
      present:   { forms:["mange","manges","mange","mangeons","mangez","mangent"], risk:true },
      imparfait: { forms:["mangeais","mangeais","mangeait","mangions","mangiez","mangeaient"], risk:true },
      futur:     { forms:["mangerai","mangeras","mangera","mangerons","mangerez","mangeront"], risk:false },
      passeCompose: { aux:"avoir", pp:"mangé", risk:false }
    }},
    commencer: { groupe:"6P", tenses: {
      present:   { forms:["commence","commences","commence","commençons","commencez","commencent"], risk:true },
      imparfait: { forms:["commençais","commençais","commençait","commencions","commenciez","commençaient"], risk:true },
      futur:     { forms:["commencerai","commenceras","commencera","commencerons","commencerez","commenceront"], risk:false },
      passeCompose: { aux:"avoir", pp:"commencé", risk:false }
    }},
    sortir: { groupe:"6P", tenses: {
      present:   { forms:["sors","sors","sort","sortons","sortez","sortent"], risk:true },
      imparfait: { forms:["sortais","sortais","sortait","sortions","sortiez","sortaient"], risk:false },
      futur:     { forms:["sortirai","sortiras","sortira","sortirons","sortirez","sortiront"], risk:false },
      passeCompose: { aux:"être", pp:"sorti", risk:true }
    }},
    venir: { groupe:"6P", tenses: {
      present:   { forms:["viens","viens","vient","venons","venez","viennent"], risk:true },
      imparfait: { forms:["venais","venais","venait","venions","veniez","venaient"], risk:false },
      futur:     { forms:["viendrai","viendras","viendra","viendrons","viendrez","viendront"], risk:true },
      passeCompose: { aux:"être", pp:"venu", risk:true }
    }},
    courir: { groupe:"6P", tenses: {
      present:   { forms:["cours","cours","court","courons","courez","courent"], risk:true },
      imparfait: { forms:["courais","courais","courait","courions","couriez","couraient"], risk:false },
      futur:     { forms:["courrai","courras","courra","courrons","courrez","courront"], risk:true },
      passeCompose: { aux:"avoir", pp:"couru", risk:true }
    }},
    mettre: { groupe:"6P", tenses: {
      present:   { forms:["mets","mets","met","mettons","mettez","mettent"], risk:true },
      imparfait: { forms:["mettais","mettais","mettait","mettions","mettiez","mettaient"], risk:false },
      futur:     { forms:["mettrai","mettras","mettra","mettrons","mettrez","mettront"], risk:false },
      passeCompose: { aux:"avoir", pp:"mis", risk:true }
    }},
    rendre: { groupe:"6P", tenses: {
      present:   { forms:["rends","rends","rend","rendons","rendez","rendent"], risk:false },
      imparfait: { forms:["rendais","rendais","rendait","rendions","rendiez","rendaient"], risk:false },
      futur:     { forms:["rendrai","rendras","rendra","rendrons","rendrez","rendront"], risk:false },
      passeCompose: { aux:"avoir", pp:"rendu", risk:false }
    }},
    prendre: { groupe:"6P", tenses: {
      present:   { forms:["prends","prends","prend","prenons","prenez","prennent"], risk:true },
      imparfait: { forms:["prenais","prenais","prenait","prenions","preniez","prenaient"], risk:true },
      futur:     { forms:["prendrai","prendras","prendra","prendrons","prendrez","prendront"], risk:false },
      passeCompose: { aux:"avoir", pp:"pris", risk:true }
    }},
    pouvoir: { groupe:"6P", tenses: {
      present:   { forms:["peux","peux","peut","pouvons","pouvez","peuvent"], risk:true },
      imparfait: { forms:["pouvais","pouvais","pouvait","pouvions","pouviez","pouvaient"], risk:false },
      futur:     { forms:["pourrai","pourras","pourra","pourrons","pourrez","pourront"], risk:true },
      passeCompose: { aux:"avoir", pp:"pu", risk:true }
    }},
    voir: { groupe:"6P", tenses: {
      present:   { forms:["vois","vois","voit","voyons","voyez","voient"], risk:true },
      imparfait: { forms:["voyais","voyais","voyait","voyions","voyiez","voyaient"], risk:true },
      futur:     { forms:["verrai","verras","verra","verrons","verrez","verront"], risk:true },
      passeCompose: { aux:"avoir", pp:"vu", risk:false }
    }}
  }
};

/* =======================================================================
   Pools de sujets — pour varier je/tu/nous/vous (pronoms fixes) et
   surtout les 2 emplacements "3e personne" (singulier et pluriel), où
   l'élève doit déduire la personne à partir du sujet.

   Important : il / elle / on d'un côté, ils / elles de l'autre, sont
   des entrées SÉPARÉES et distinctes du pool (pas un seul "pronom 3e
   personne" générique) — chacun a sa chance d'être tiré, au même titre
   que les prénoms et les groupes nominaux.
   ======================================================================= */

window.CONJ_SUBJECTS = {
  singulier: [
    { type:"pronom", text:"il",   gender:"m" },
    { type:"pronom", text:"elle", gender:"f" },
    { type:"pronom", text:"on",   gender:"m" },
    { type:"prenom", text:"Thomas", gender:"m" },
    { type:"prenom", text:"Lucas",  gender:"m" },
    { type:"prenom", text:"Nathan", gender:"m" },
    { type:"prenom", text:"Julie",  gender:"f" },
    { type:"prenom", text:"Léa",    gender:"f" },
    { type:"prenom", text:"Emma",   gender:"f" },
    { type:"gn", text:"le chat",        gender:"m" },
    { type:"gn", text:"mon frère",      gender:"m" },
    { type:"gn", text:"le voisin",      gender:"m" },
    { type:"gn", text:"le maître",      gender:"m" },
    { type:"gn", text:"mon papa",       gender:"m" },
    { type:"gn", text:"mon ami",        gender:"m" },
    { type:"gn", text:"ma sœur",        gender:"f" },
    { type:"gn", text:"la maîtresse",   gender:"f" },
    { type:"gn", text:"la voisine",     gender:"f" },
    { type:"gn", text:"ma maman",       gender:"f" },
    { type:"gn", text:"mon amie",       gender:"f" },
    { type:"gn", text:"la directrice",  gender:"f" }
  ],
  pluriel: [
    { type:"pronom", text:"ils",   gender:"m" },
    { type:"pronom", text:"elles", gender:"f" },
    { type:"prenom", text:"Thomas et Lucas", gender:"m" },
    { type:"prenom", text:"Julie et Léa",    gender:"f" },
    { type:"gn", text:"les enfants",  gender:"m" },
    { type:"gn", text:"mes parents",  gender:"m" },
    { type:"gn", text:"les élèves",   gender:"m" },
    { type:"gn", text:"les voisins",  gender:"m" },
    { type:"gn", text:"mes frères",   gender:"m" },
    { type:"gn", text:"mes copines",  gender:"f" },
    { type:"gn", text:"mes cousines", gender:"f" },
    { type:"gn", text:"les filles",   gender:"f" },
    { type:"gn", text:"mes amies",    gender:"f" }
  ]
};

window.CONJ_PERSON_LABELS = ["je", "tu", "3e-singulier", "nous", "vous", "3e-pluriel"];
window.CONJ_TENSE_LABELS = {
  present: "présent",
  imparfait: "imparfait",
  futur: "futur",
  passeCompose: "passé composé"
};
