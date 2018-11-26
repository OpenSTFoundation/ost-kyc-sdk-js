"use strict";
const rootPrefix = ".",

  chai = require("chai"),
  assert = chai.assert,

  RequestKlass = require(rootPrefix + "/lib/request"),

  qs = require("qs"),

  fs = require("fs"),

  configObj = JSON.parse(fs.readFileSync(rootPrefix + '/configuration.json', 'utf8')),

  testObjForSignature = configObj["testObjForSignature"],

  credentialObject = {
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  },
  apiEndpont = process.env.API_BASE_URL,

  KYCSDK = require(rootPrefix + "/index"),
  //config is optional param, timeout should be given in seconds
  kycSdk = new KYCSDK({apiKey: credentialObject.apiKey, apiSecret: credentialObject.secret, apiEndpoint: apiEndpont, config:{timeout:15}}),
  userService = kycSdk.services.users,
  usersKycService = kycSdk.services.usersKyc,
  usersKycDetailsService = kycSdk.services.usersKycDetails,
  validateService = kycSdk.services.validators

;

function testSignature() {
  it("Signature should match with given one", function () {
    const requestObj = new RequestKlass({apiKey: '12121', apiSecret: 'dsdsd', apiEndpoint: "endpoint"}),
      queryString = requestObj.formatQueryParams(testObjForSignature);
    var fullQueryString = requestObj.signQueryParamsTest(configObj["testResource"], queryString, credentialObject),
      queryStringObj = qs.parse(fullQueryString);
    assert.equal(queryStringObj.signature, configObj["signatureExpected"]);
  });
}

function testGetUsers() {
  it('Testing get user',
    async function () {
    var userId = process.env.USER_ID
    const response = await
    userService.get({id: userId}).catch(function (err) {
      assert.fail('GET User testcase is failed');
    });
    assert.equal(response.success, true);
  }

)
  ;
}

function testGetUsersList() {
  it('Testing list user',
    async function () {
    var userId = process.env.USER_ID
    const response = await
    userService.list({id: userId}).catch(function (err) {
      assert.fail('GET User list testcase is failed');
    });
  }

)
  ;
}

function testCreateUser() {
  it('response.success should be true for testing create request',
    async function () {
      var email = 'alice+' + Date.now() + '@ost.com';
      const response = await
      userService.create({email: email}).catch(function (err) {
        assert.fail('Create User testcase is failed');
      });
      assert.equal(response.success, true);
  }
  )
  ;
}

function testGetUserKyc() {
  it("Get user's KYC",
    async function () {
    var userId = process.env.USER_ID
    const response = await
    usersKycService.get({user_id: userId}).catch(function (err) {
      assert.fail('Get Users KYC testcase is failed');
    });
    assert.equal(response.success, true);
  }

)
  ;

}


function testGetUserKycList() {
  it("Get user's KYC",
    async function () {
    var userId = process.env.USER_ID
    const response = await
    usersKycService.get({user_id: userId}).catch(function (err) {
      assert.fail('Get Users KYC testcase is failed');
    });
    assert.equal(response.success, true);
  }

)
  ;

}

function testSubmitKyc() {
  it("Submit KYC",
    async function () {
    var obj = {
      'user_id': 11035,
      'first_name': 'aniket',
      'last_name': 'ayachit',
      'birthdate': '21/12/1991',
      'country': 'india',
      'nationality': 'indian',
      'document_id_number': 'arqpa7659a',
      'document_id_file_path': '2/i/016be96da275031de2787b57c99f1471',
      'selfie_file_path': '2/i/9e8d3a5a7a58f0f1be50b7876521aebc',
      'residence_proof_file_path': '2/i/4ed790b2d525f4c7b30fbff5cb7bbbdb',
      'ethereum_address': '0xdfbc84ccac430f2c0455c437adf417095d7ad68e',
      'estimated_participation_amount': '2',
      'street_address': 'afawfveav ',
      'city': 'afawfveav',
      'state': 'afawfveav',
      'postal_code': 'afawfveav',
      'investor_proof_files_path': ['2/i/9ff6374909897ca507ba3077ee8587da', '2/i/4872730399670c6d554ab3821d63ebce']
    }
    const response = await
    usersKycService.submitKyc(obj).then(function (res) {
      assert.fail('Get Users KYC testcase should pass error in response');
    }).catch(function (err) {
    });

  }

)
  ;

}

function testGetPresignedUrlForPut() {
  it("Get PresignedUrl for PUT",
    async function () {
    var userId = process.env.USER_ID
    const response = await
    usersKycService.getPresignedUrlPut(configObj["getPreSignedUrlObj"]).catch(function (err) {
      console.log("this is error", err['success']);
      assert.fail('Get Presigned Url For Put testcase is failed');
    });
    assert.equal(response.success, true);
  }

)
  ;

}


function testGetPresignedUrlForPost() {
  it("Get PresignedUrl for POST",
    async function () {
    var userId = process.env.USER_ID
    const response = await
    usersKycService.getPresignedUrlPost(configObj["getPreSignedUrlObj"]).catch(function (err) {
      console.log("this is error", err['success']);
      assert.fail('Get Presigned Url For POST testcase is failed');
    });
    assert.equal(response.success, true);
  }

)
  ;

}


function testGetUserKycDetails() {

  it("Get PresignedUrl for POST",
    async function () {
    var userId = process.env.USER_ID
    const response = await
    usersKycDetailsService.get({user_id: process.env.USER_ID}).catch(function (err) {
      console.log("this is error", err['success']);
      assert.fail('Get User KYC details testcase is failed');
    });
  }

)
  ;


}

function testValidateEthereumAddress() {
  it('Verify Ethereum address',
    async function () {
    const response = await
    validateService.verifyEthereumAddress({ethereum_address: '0x32be343b94f860124dc4fee278fdcbd38c102d88'}).then(function (r) {
      console.log('response', r);
    }).catch(function (err) {
      console.log(err);
      assert.fail('Verify eth adress failed');
    });
  }

)
  ;


}


function main() {
  testSignature();
  testGetUsers();
  testGetUsersList();
  testCreateUser();
  testGetUserKyc();
  testGetUserKycList();
  testSubmitKyc();
  testGetPresignedUrlForPut();
  testGetPresignedUrlForPost();
  testGetUserKycDetails();
  testValidateEthereumAddress();


  //testGetRequest();
  //checkPostRequest();
}

main();





