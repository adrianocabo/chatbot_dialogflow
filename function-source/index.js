// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
 
   function tema(agent) {
    if (agent.parameters['tema-mae'].toLowerCase() == 'posparto')
		{
			agent.add('Fim do Case. Obrigado!');
		} 	
   		else if (agent.parameters['tema-mae'].toLowerCase() == 'bebe')
        {
          	agent.add('Fim do Case. Obrigado!');
        }
  }
  
   function amamentacao(agent) {
    if (agent.parameters[`tema-amamentacao`].toLowerCase() == `leitefraco`)
		{
			agent.add(`Fim do Case. Obrigado!`);
		} 	
   		else if (agent.parameters[`tema-amamentacao`].toLowerCase() == `dornamama`)
        {
          	agent.add(`Fim do Case. Obrigado!`);
        }
   		else if (agent.parameters[`tema-amamentacao`].toLowerCase() == `mamada`)
        {
          	agent.add(`Fim do Case. Obrigado!`);
        }
   		else if (agent.parameters[`tema-amamentacao`].toLowerCase() == `peito`)
        {
          	agent.add(`Fim do Case. Obrigado!`);
        }
  }
 
  function producao(agent) {
    if (agent.parameters[`tema-aumento`].toLowerCase() == `letraa`)
		{
			agent.add(`Que bom! Saiba que seu corpo é muito inteligente e sabe quando produzir leite.\nÀs vezes, ele só precisa entrar no ritmo. Quanto mais você amamentar, mais leite você vai produzir.\nQuanto à mamadeira, se precisar usar, espere um pouquinho até que seu bebê esteja acostumado a mamar no seu peito para não acontecer confusão de bico.\nSabia que o extrator de leite pode te ajudar aumentar a produção de leite. A Avent está com uma promoção de 25% até final de Fevereiro em seu produto..`);
		} 	
   		else if (agent.parameters[`tema-aumento`].toLowerCase() == `letrab`)
        {
          	agent.add(`Saiba que seu corpo é muito inteligente e sabe quando produzir leite.\nÀs vezes, ele só precisa entrar no ritmo. \n Tirar o leite entre as mamadas pode ajudar na produção de leite. E o extrator facilita bastante.`);
        }
    	else if (agent.parameters[`tema-aumento`].toLowerCase() == `letrac`)
        {
          	agent.add(`Saiba que seu corpo é muito inteligente e sabe quando produzir leite.\nÀs vezes, ele só precisa entrar no ritmo. \n Tirar o leite entre as mamadas pode ajudar na produção de leite. E o extrator facilita bastante.`);
        }
  }
  
   function calculo(agent) {
     let data = agent.parameters.dt;
     let hoje = new Date();
    
     data = new Date(data);
     hoje = new Date(hoje);
     
     const diffInTime = Math.abs(hoje - data);
     const timeInOneDay = (1000 * 60 * 60 * 24);
     const diffInDays = Math.ceil(diffInTime / timeInOneDay);
     const semanas = Math.trunc(diffInDays / 7);

     
     if (semanas == 4 ) 
     {
        agent.add(`Você tem ${semanas} semanas de gestação. Seu bebê deixa de ser um montinho de células e passa a ser um embrião.\nA maioria das mulheres começa a sentir algo diferente. Quem está tentando engravidar já vai perceber o atraso e é uma boa hora para testes (pode ser o de farmácia).\nÉ um bom momento para começar a fazer o pré-natal. Leve seu companheiro também, pois é importante que ele faça alguns exames :)\nSaiba que abortos espontâneos são comuns no comecinho da gravidez. Cerca de 20% das mães perdem os bebês. Quer saber mais? digite sim ou não.`);
     }
     else if (semanas == 10 )
     {
		agent.add(`Você tem ${semanas} semanas de gestação. O bebê já começa a formar seus dentes de leite mas só irão romper na gengiva alguns meses após o nascimento.\nOs olhos também começam a se desenvolver. Finalmente se tornou um feto, pois a calda que lembrava um girino sumiu.\no seu corpo, o volume de sangue aumenta de 40% a 50%. Fazer alguns exercícios ajuda a melhorar o fluxo sanguíneo.\nVocê está se sentindo bem ou você tem alguma queixa?\na. Sentido bem\nb. Tenho queixa`);
     }
	 else if (semanas == 25 )
     {
        agent.add(`Você tem ${semanas} semanas de gestação. O seu bebê já está com uma aparência mais rosada pois os vasos sanguíneos estão se desenvolvendo sob a pele.\nSua bexiga está mais apertadinha do que nunca e isso aumenta a chance de ter uma infecção de urina. Assim, não esqueça de beber bastante água mesmo que isto faça ir mais vezes ao banheiro.\nJá podemos dizer chamar seu bebê de “viável”, pois se ele nascer em um hospital com bons recursos, já conseguirá sobreviver. Mas o melhor a fazer é esperar e fazer que seu bebê fique o mais tempo possível dentro da sua barriga.\nVocê está se sentindo bem ou você tem alguma queixa?\na. Sentido bem\nb. Tenho queixa`);
     }
  }

   function queixa(agent) {
    if (agent.parameters.queixa.toLowerCase() == `dordecabeca`)
		{
			agent.add(`As dores de cabeça podem ser bem comuns durante a gravidez devido às mudanças no corpo.\nDicas para aliviar os sintomas ✨:\n● Beba bastante água;\n● Não fique mais de 3 horas sem comer;\n● Faça períodos de repouso durante o dia;\n● Converse sobre seus medos e ansiedades;\n● Não tome remédio sem falar com o profissional de saúde.`);
		} 	
   		else if (agent.parameters.queixa.toLowerCase() == `enjoo`)
        {
          	agent.add(`É muito comum sentir náusea no primeiro trimestre.\nGeralmente esta sensação é mais intensa pela manhã, ao acordar ou após um longo período sem comer.\nAlguns cheiros podem fazer os enjoos piorarem como o cheiro de cigarro ou o gosto da pasta de dente. Mas varia bastante para cada mulher.\nQuer saber dicas de como amenizar os enjoos? Sim ou Não`);
        }
  }     

     
   //  agent.add('${hoje}');
  
  
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('I12', calculo);
  intentMap.set('I13', calculo);
  intentMap.set('I16', queixa);
  intentMap.set('I2', tema);
  intentMap.set('I3', amamentacao);
  intentMap.set('I4', producao);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
