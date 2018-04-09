var List_SERVICES = angular.module('starter.ListServices', ['ngMaterial', 'ngMessages']);

//user details

List_SERVICES.factory('MenuList', function($window) {

  var data = [];var item_project = "";var item_members = "";var item_skills = "";var EMP_TYPE = [];var account_TYPE = [];var gender = [];var mstatus = [];var item_superv = "";
  var LeaveType = [];var ShortLType = [];var CodeSymbol = [];
   return{
      get: function(){
          data = [
                     { name: 'Dashboard', icon_name: 'fa-home' , color:'#145c96'},
                     //{ name: 'Overview', icon_name: 'fa-eye'},
                    // { name: 'Time Off Policy', icon_name: 'fa-university'},
                     { name: 'Employees', icon_name: 'fa-users',color:'#145c96'},
                     { name: 'Task', icon_name: 'fa-tasks',color:'#145c96'},
                     { name: 'Apply Leave', icon_name: 'fa-pencil-square-o',color:'#145c96'},
                     { name: 'Training', icon_name: 'fa-bicycle',color:'#145c96'},
                     //{ name: 'My Profile', icon_name: 'fa-user'},
                     { name: 'Timesheet', icon_name: 'fa-calendar-check-o',color:'#145c96'},
                     { name: 'Attendance', icon_name: 'fa-dot-circle-o',color:'#145c96'},
                     { name: 'Expenses', icon_name: 'fa-google-wallet',color:'#145c96'},
                     { name: 'Payroll', icon_name: 'fa-university',color:'#145c96'},
                     { name: 'Holidays', icon_name: 'fa-cube',color:'#145c96'}

                   ];
          return data;
      },
      getEMP_TYPE: function(){
           EMP_TYPE = [
                          { name: 'Contractor'},
                          { name: 'Full Time'},
                          { name: 'Part Time'},
                          { name: 'Intern'}

                       ];
           return EMP_TYPE;
      },
      getAccountTYPE: function(){
           account_TYPE = [
                           { name: 'Current'},
                           { name: 'Saving'},
                           { name: 'Other'}

                         ];
           return account_TYPE;
      },
      getMaritalStatus: function(){
            mstatus = [
                              { name: 'Married'},
                              { name: 'Single'},
                              { name: 'Partnership'},
                              { name: 'Widowed'},
                              { name: 'Divorced'}

                           ];
            return mstatus;
      },
      getGender: function(){
            gender = [
                       { name: 'Male'},
                       { name: 'Female'}

                      ];
            return gender;
      },

      getLeaveType: function(){
            LeaveType = [
                      //{ name: 'Casual Leave'},
                     // { name: 'Sick Leave'},
                      //{ name: 'Compensatory Off'},
                      //{ name: 'Short Leave'}
                      {name: 'Privilege Leave'},
                      {name: 'CompOff Leave'}
                     ];
            return LeaveType;
      },
      getShortLType: function(){
            ShortLType = [
                     { name: 'Half Day'},
                     { name: 'Quater Day'}

                     ];
         return ShortLType;
      },
      skills: function(){
      item_skills = $window.localStorage.getItem("Skills");
      return item_skills;
      },

      currencySymbol : function(){
      CodeSymbol = [
                       {
                           "symbol": "$",
                           "name": "US Dollar",
                           "code": "USD"
                       },
                       {
                           "symbol": "CA$",
                           "name": "Canadian Dollar",
                           "code": "CAD"
                       },
                       {
                           "symbol": "€",
                           "name": "Euro",
                           "code": "EUR"
                       },
                       {
                           "symbol": "AED",
                           "name": "United Arab Emirates Dirham",
                           "code": "AED"
                       },
                       {
                           "symbol": "Af",
                           "name": "Afghan Afghani",
                           "code": "AFN"
                       },
                       {
                           "symbol": "ALL",
                           "name": "Albanian Lek",
                           "code": "ALL"
                       },
                       {
                           "symbol": "AMD",
                           "name": "Armenian Dram",
                           "code": "AMD"
                       },
                       {
                           "symbol": "AR$",
                           "name": "Argentine Peso",
                           "code": "ARS"
                       },
                       {
                           "symbol": "AU$",
                           "name": "Australian Dollar",
                           "code": "AUD"
                       },
                       {
                           "symbol": "man.",
                           "name": "Azerbaijani Manat",
                           "code": "AZN"
                       },
                       {
                           "symbol": "KM",
                           "name": "Bosnia-Herzegovina Convertible Mark",
                           "code": "BAM"
                       },
                       {
                           "symbol": "Tk",
                           "name": "Bangladeshi Taka",
                           "code": "BDT"
                       },
                       {
                           "symbol": "BGN",
                           "name": "Bulgarian Lev",
                           "code": "BGN"
                       },
                       {
                           "symbol": "BD",
                           "name": "Bahraini Dinar",
                           "code": "BHD"
                       },
                       {
                           "symbol": "FBu",
                           "name": "Burundian Franc",
                           "code": "BIF"
                       },
                       {
                           "symbol": "BN$",
                           "name": "Brunei Dollar",
                           "code": "BND"
                       },
                       {
                           "symbol": "Bs",
                           "name": "Bolivian Boliviano",
                           "code": "BOB"
                       },
                       {
                           "symbol": "R$",
                           "name": "Brazilian Real",
                           "code": "BRL"
                       },
                       {
                           "symbol": "BWP",
                           "name": "Botswanan Pula",
                           "code": "BWP"
                       },
                       {
                           "symbol": "BYR",
                           "name": "Belarusian Ruble",
                           "code": "BYR"
                       },
                       {
                           "symbol": "BZ$",
                           "name": "Belize Dollar",
                           "code": "BZD"
                       },
                       {
                           "symbol": "CDF",
                           "name": "Congolese Franc",
                           "code": "CDF"
                       },
                       {
                           "symbol": "CHF",
                           "name": "Swiss Franc",
                           "code": "CHF"
                       },
                       {
                           "symbol": "CL$",
                           "name": "Chilean Peso",
                           "code": "CLP"
                       },
                       {
                           "symbol": "CN¥",
                           "name": "Chinese Yuan",
                           "code": "CNY"
                       },
                       {
                           "symbol": "CO$",
                           "name": "Colombian Peso",
                           "code": "COP"
                       },
                       {
                           "symbol": "₡",
                           "name": "Costa Rican Colón",
                           "code": "CRC"
                       },
                       {
                           "symbol": "CV$",
                           "name": "Cape Verdean Escudo",
                           "code": "CVE"
                       },
                       {
                           "symbol": "Kč",
                           "name": "Czech Republic Koruna",
                           "code": "CZK"
                       },
                       {
                           "symbol": "Fdj",
                           "name": "Djiboutian Franc",
                           "code": "DJF"
                       },
                       {
                           "symbol": "Dkr",
                           "name": "Danish Krone",
                           "code": "DKK"
                       },
                       {
                           "symbol": "RD$",
                           "name": "Dominican Peso",
                           "code": "DOP"
                       },
                       {
                           "symbol": "DA",
                           "name": "Algerian Dinar",
                           "code": "DZD"
                       },
                       {
                           "symbol": "Ekr",
                           "name": "Estonian Kroon",
                           "code": "EEK"
                       },
                       {
                           "symbol": "EGP",
                           "name": "Egyptian Pound",
                           "code": "EGP"
                       },
                       {
                           "symbol": "Nfk",
                           "name": "Eritrean Nakfa",
                           "code": "ERN"
                       },
                       {
                           "symbol": "Br",
                           "name": "Ethiopian Birr",
                           "code": "ETB"
                       },
                       {
                           "symbol": "£",
                           "name": "British Pound Sterling",
                           "code": "GBP"
                       },
                       {
                           "symbol": "GEL",
                           "name": "Georgian Lari",
                           "code": "GEL"
                       },
                       {
                           "symbol": "GH₵",
                           "name": "Ghanaian Cedi",
                           "code": "GHS"
                       },
                       {
                           "symbol": "FG",
                           "name": "Guinean Franc",
                           "code": "GNF"
                       },
                       {
                           "symbol": "GTQ",
                           "name": "Guatemalan Quetzal",
                           "code": "GTQ"
                       },
                       {
                           "symbol": "HK$",
                           "name": "Hong Kong Dollar",
                           "code": "HKD"
                       },
                       {
                           "symbol": "HNL",
                           "name": "Honduran Lempira",
                           "code": "HNL"
                       },
                       {
                           "symbol": "kn",
                           "name": "Croatian Kuna",
                           "code": "HRK"
                       },
                       {
                           "symbol": "Ft",
                           "name": "Hungarian Forint",
                           "code": "HUF"
                       },
                       {
                           "symbol": "Rp",
                           "name": "Indonesian Rupiah",
                           "code": "IDR"
                       },
                       {
                           "symbol": "₪",
                           "name": "Israeli New Sheqel",
                           "code": "ILS"
                       },
                       {
                           "symbol": "Rs",
                           "name": "Indian Rupee",
                           "code": "INR"
                       },
                       {
                           "symbol": "IQD",
                           "name": "Iraqi Dinar",
                           "code": "IQD"
                       },
                       {
                           "symbol": "IRR",
                           "name": "Iranian Rial",
                           "code": "IRR"
                       },
                       {
                           "symbol": "Ikr",
                           "name": "Icelandic Króna",
                           "code": "ISK"
                       },
                       {
                           "symbol": "J$",
                           "name": "Jamaican Dollar",
                           "code": "JMD"
                       },
                       {
                           "symbol": "JD",
                           "name": "Jordanian Dinar",
                           "code": "JOD"
                       },
                       {
                           "symbol": "¥",
                           "name": "Japanese Yen",
                           "code": "JPY"
                       },
                       {
                           "symbol": "Ksh",
                           "name": "Kenyan Shilling",
                           "code": "KES"
                       },
                       {
                           "symbol": "KHR",
                           "name": "Cambodian Riel",
                           "code": "KHR"
                       },
                       {
                           "symbol": "CF",
                           "name": "Comorian Franc",
                           "code": "KMF"
                       },
                       {
                           "symbol": "₩",
                           "name": "South Korean Won",
                           "code": "KRW"
                       },
                       {
                           "symbol": "KD",
                           "name": "Kuwaiti Dinar",
                           "code": "KWD"
                       },
                       {
                           "symbol": "KZT",
                           "name": "Kazakhstani Tenge",
                           "code": "KZT"
                       },
                       {
                           "symbol": "LB£",
                           "name": "Lebanese Pound",
                           "code": "LBP"
                       },
                       {
                           "symbol": "SLRs",
                           "name": "Sri Lankan Rupee",
                           "code": "LKR"
                       },
                       {
                           "symbol": "Lt",
                           "name": "Lithuanian Litas",
                           "code": "LTL"
                       },
                       {
                           "symbol": "Ls",
                           "name": "Latvian Lats",
                           "code": "LVL"
                       },
                       {
                           "symbol": "LD",
                           "name": "Libyan Dinar",
                           "code": "LYD"
                       },
                       {
                           "symbol": "MAD",
                           "name": "Moroccan Dirham",
                           "code": "MAD"
                       },
                       {
                           "symbol": "MDL",
                           "name": "Moldovan Leu",
                           "code": "MDL"
                       },
                       {
                           "symbol": "MGA",
                           "name": "Malagasy Ariary",
                           "code": "MGA"
                       },
                       {
                           "symbol": "MKD",
                           "name": "Macedonian Denar",
                           "code": "MKD"
                       },
                       {
                           "symbol": "MMK",
                           "name": "Myanma Kyat",
                           "code": "MMK"
                       },
                       {
                           "symbol": "MOP$",
                           "name": "Macanese Pataca",
                           "code": "MOP"
                       },
                       {
                           "symbol": "MURs",
                           "name": "Mauritian Rupee",
                           "code": "MUR"
                       },
                       {
                           "symbol": "MX$",
                           "name": "Mexican Peso",
                           "code": "MXN"
                       },
                       {
                           "symbol": "RM",
                           "name": "Malaysian Ringgit",
                           "code": "MYR"
                       },
                       {
                           "symbol": "MTn",
                           "name": "Mozambican Metical",
                           "code": "MZN"
                       },
                       {
                           "symbol": "N$",
                           "name": "Namibian Dollar",
                           "code": "NAD"
                       },
                       {
                           "symbol": "₦",
                           "name": "Nigerian Naira",
                           "code": "NGN"
                       },
                       {
                           "symbol": "C$",
                           "name": "Nicaraguan Córdoba",
                           "code": "NIO"
                       },
                       {
                           "symbol": "Nkr",
                           "name": "Norwegian Krone",
                           "code": "NOK"
                       },
                       {
                           "symbol": "NPRs",
                           "name": "Nepalese Rupee",
                           "code": "NPR"
                       },
                       {
                           "symbol": "NZ$",
                           "name": "New Zealand Dollar",
                           "code": "NZD"
                       },
                       {
                           "symbol": "OMR",
                           "name": "Omani Rial",
                           "code": "OMR"
                       },
                       {
                           "symbol": "B/.",
                           "name": "Panamanian Balboa",
                           "code": "PAB"
                       },
                       {
                           "symbol": "S/.",
                           "name": "Peruvian Nuevo Sol",
                           "code": "PEN"
                       },
                       {
                           "symbol": "₱",
                           "name": "Philippine Peso",
                           "code": "PHP"
                       },
                       {
                           "symbol": "PKRs",
                           "name": "Pakistani Rupee",
                           "code": "PKR"
                       },
                       {
                           "symbol": "zł",
                           "name": "Polish Zloty",
                           "code": "PLN"
                       },
                       {
                           "symbol": "₲",
                           "name": "Paraguayan Guarani",
                           "code": "PYG"
                       },
                       {
                           "symbol": "QR",
                           "name": "Qatari Rial",
                           "code": "QAR"
                       },
                       {
                           "symbol": "RON",
                           "name": "Romanian Leu",
                           "code": "RON"
                       },
                       {
                           "symbol": "din.",
                           "name": "Serbian Dinar",
                           "code": "RSD"
                       },
                       {
                           "symbol": "RUB",
                           "name": "Russian Ruble",
                           "code": "RUB"
                       },
                       {
                           "symbol": "RWF",
                           "name": "Rwandan Franc",
                           "code": "RWF"
                       },
                       {
                           "symbol": "SR",
                           "name": "Saudi Riyal",
                           "code": "SAR"
                       },
                       {
                           "symbol": "SDG",
                           "name": "Sudanese Pound",
                           "code": "SDG"
                       },
                       {
                           "symbol": "Skr",
                           "name": "Swedish Krona",
                           "code": "SEK"
                       },
                       {
                           "symbol": "S$",
                           "name": "Singapore Dollar",
                           "code": "SGD"
                       },
                       {
                           "symbol": "Ssh",
                           "name": "Somali Shilling",
                           "code": "SOS"
                       },
                       {
                           "symbol": "SY£",
                           "name": "Syrian Pound",
                           "code": "SYP"
                       },
                       {
                           "symbol": "฿",
                           "name": "Thai Baht",
                           "code": "THB"
                       },
                       {
                           "symbol": "DT",
                           "name": "Tunisian Dinar",
                           "code": "TND"
                       },
                       {
                           "symbol": "T$",
                           "name": "Tongan Paʻanga",
                           "code": "TOP"
                       },
                       {
                           "symbol": "TL",
                           "name": "Turkish Lira",
                           "code": "TRY"
                       },
                       {
                           "symbol": "TT$",
                           "name": "Trinidad and Tobago Dollar",
                           "code": "TTD"
                       },
                       {
                           "symbol": "NT$",
                           "name": "New Taiwan Dollar",
                           "code": "TWD"
                       },
                       {
                           "symbol": "TSh",
                           "name": "Tanzanian Shilling",
                           "code": "TZS"
                       },
                       {
                           "symbol": "₴",
                           "name": "Ukrainian Hryvnia",
                           "code": "UAH"
                       },
                       {
                           "symbol": "USh",
                           "name": "Ugandan Shilling",
                           "code": "UGX"
                       },
                       {
                           "symbol": "$U",
                           "name": "Uruguayan Peso",
                           "code": "UYU"
                       },
                       {
                           "symbol": "UZS",
                           "name": "Uzbekistan Som",
                           "code": "UZS"
                       },
                       {
                           "symbol": "Bs.F.",
                           "name": "Venezuelan Bolívar",
                           "code": "VEF"
                       },
                       {
                           "symbol": "₫",
                           "name": "Vietnamese Dong",
                           "code": "VND"
                       },
                       {
                           "symbol": "FCFA",
                           "name": "CFA Franc BEAC",
                           "code": "XAF"
                       },
                       {
                           "symbol": "CFA",
                           "name": "CFA Franc BCEAO",
                           "code": "XOF"
                       },
                       {
                           "symbol": "YR",
                           "name": "Yemeni Rial",
                           "code": "YER"
                       },
                       {
                           "symbol": "R",
                           "name": "South African Rand",
                           "code": "ZAR"
                       },
                       {
                           "symbol": "ZK",
                           "name": "Zambian Kwacha",
                           "code": "ZMK"
                       }
                   ]
           return CodeSymbol;
      }
      /*getSupervisors: function(){
            item_superv = JSON.parse( $window.localStorage.getItem("Supervisors") );
            return item_superv;
       }*/
     /* Projects: function(){
      item_project = $window.localStorage.getItem("Projects");
      return item_project;
      },
      Members: function(){
      item_members = $window.localStorage.getItem("Members");
      console.log(item_members);
      return item_members;
      },*/


    }
  });


  List_SERVICES.service('StoreResponse',function($window,$ionicViewSwitcher,$ionicHistory) {

     var projectStorage,memberStorage,menuITEM,envelope,completeTask,tokenValue,status;
        return {


           get_projects: function() {
              return projectStorage;
           },
           store_projects: function (project) {
                projectStorage = JSON.stringify(project);

           },
           get_CompletedTask: function() {
              return completeTask;
           },
           store_CompletedTask: function (task) {
             completeTask = JSON.stringify(task);

           },
           get_members: function() {
            return memberStorage;
           },
           store_members: function (members) {
             memberStorage = JSON.stringify(members);

           },
            getMonthFromString: function (mon){
              return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
           },
           getToken : function(token){
            tokenValue = token;
           },
           sendToken : function(){
           return tokenValue;
           },

           getTodayDate : function(){
           var d = new Date();
           var month = d.getMonth()+1;
           var day = d.getDate();
           var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+((''+day).length<2 ? '0' : '') + day;
           return output;
           },
           goToMenuItemPage: function (menuitem) {
            if(menuitem == "Dashboard"){
                menuITEM = "dashboard";
              }
            else if(menuitem == "Overview"){

            }
            else if(menuitem == "Time Off Policy"){

            }
            else if(menuitem == "Employees"){
            menuITEM = "employees";
            }
            else if(menuitem == "Task"){
            menuITEM = "task";
            }
            else if(menuitem == "Training"){
            menuITEM = "training";
            }
            else if(menuitem == "My Profile"){
            menuITEM = "myProfile";
            }
            else if(menuitem == "Apply Leave"){
             menuITEM = "applyLeave";
            }
            else if(menuitem == "Timesheet"){
              menuITEM = "timesheet";
            }
            else if(menuitem == "Holidays"){
               menuITEM = "holidays";
            }
            else if(menuitem == "Attendance"){
              menuITEM = "attendance";
            }
            else if(menuitem == "Payroll"){
              menuITEM = "payroll";
            }
            else if(menuitem == "Expenses"){
               menuITEM = "expense";
            }

            else{

            menuITEM = "login";
            /*$window.localStorage.removeItem("response_token");
            location.reload();
            $window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();*/


            }
            return menuITEM;

           },
           expenseStatus : function(n){
           var status;
           if(parseInt(n) == 1){
           status = "Pending at Manager";
           }
           else if(parseInt(n) == 3){
           status = "Accepted by Manager";
           }
           else if(parseInt(n) == 4){
           status = "Rejected by Manager";// both should be hide del / update btn
           }
           else if(parseInt(n) == 7){
           status = "Reverted by manager";// both should be hide del / update btn
           }
           else if(parseInt(n) == 8){
           status = "Resubmit";
           }
           else if(parseInt(n) == 9){
           status = "Cancelled";//both should be hide del / update btn
           }
           else if(parseInt(n) == 10){
           status = "Final Approved";//both should be hide del / update btn
           }
           else if(parseInt(n) == 11){
           status = "Self Approved";
           }
           else if(parseInt(n) == 12){
           status = "Rejected by accountant";//both should be hide del / update btn
           }
           else{
           console.log("no status available.");
           }
           return status;
           }

        }
   });
