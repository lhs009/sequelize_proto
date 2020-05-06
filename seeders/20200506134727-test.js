'use strict';

module.exports = {
  // up: (queryInterface, Sequelize) => {
  //   let datas = [];
  //   for (let i = 0; i < 100; i++) {
  //     let obj = {
  //       loginId: 'test' + i + '@example.com',
  //       password: '1234',
  //       nickname: 'testUser' + i,
  //       createdAt: new Date()
  //         .toISOString()
  //         .replace(/T/, ' ')
  //         .replace(/\..+/, ''),
  //       updatedAt: new Date()
  //         .toISOString()
  //         .replace(/T/, ' ')
  //         .replace(/\..+/, ''),
  //     };
  //     datas.push(obj);
  //   }

  //   return queryInterface.bulkInsert('users', datas, {});
  // },
  // up: (queryInterface, Sequelize) => {
  //   let datas = [];
  //   for (let i = 0; i < 100; i++) {
  //     let obj = {
  //       userId: i + 1,
  //       content: '검찰개혁 사법개혁 사학개혁 반드시 이루자 ===> ' + i,
  //       createdAt: new Date()
  //         .toISOString()
  //         .replace(/T/, ' ')
  //         .replace(/\..+/, ''),
  //       updatedAt: new Date()
  //         .toISOString()
  //         .replace(/T/, ' ')
  //         .replace(/\..+/, ''),
  //     };
  //     datas.push(obj);
  //   }
  // up: (queryInterface, Sequelize) => {
  //   let datas = [];
  //   for (let i = 0; i < 100; i++) {
  //     let obj = {
  //       userId: i + 1,
  //       postId: i + 201,
  //       content:
  //         '국정 농단 검찰 농단 사법 농단 나쁜 놈들 모두 쫓아내자 ===> ' + i,
  //       // createdAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //       // updatedAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //     };
  //     datas.push(obj);
  //   }
  // up: (queryInterface, Sequelize) => {
  //   let datas = [];
  //   for (let i = 0; i < 100; i++) {
  //     let obj = {
  //       followingId: i + 1,
  //       followerId: 100 - i,
  //       // createdAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //       // updatedAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //     };
  //     datas.push(obj);
  //   }

  // up: (queryInterface, Sequelize) => {
  //   let datas = [];
  //   for (let i = 0; i < 100; i++) {
  //     let obj = {
  //       userId: i + 1,
  //       postId: 201 + i,
  //       // createdAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //       // updatedAt: new Date()
  //       //   .toISOString()
  //       //   .replace(/T/, ' ')
  //       //   .replace(/\..+/, ''),
  //     };
  //     datas.push(obj);
  //   }

  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 200; i++) {
      let obj = {
        postId: 201 + i,
        src: 'https://placeimg.com/640/480/any',
        // createdAt: new Date()
        //   .toISOString()
        //   .replace(/T/, ' ')
        //   .replace(/\..+/, ''),
        // updatedAt: new Date()
        //   .toISOString()
        //   .replace(/T/, ' ')
        //   .replace(/\..+/, ''),
      };
      datas.push(obj);
    }
    return queryInterface.bulkInsert('images', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
