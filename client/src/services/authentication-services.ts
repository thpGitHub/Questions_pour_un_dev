import axios from 'axios';

export default class AuthenticateService {
    static isAuthenticated = false;
    static allLogin: any[];

    constructor() {
      
    }

    static getAllLogins() {

          return axios
                .get("/loginAll")
                // .then((allLogin) => setAllLogin(allLogin))
                .then((allLogin) => {this.allLogin = allLogin.data;
                                     console.log('in getAllLogin from AUthenticated class', allLogin);
                                     return this.allLogin;
                                    })
                .catch((err) => console.log(err));
    }

    // static async login(pseudo: any, pwd: any) {
    //     console.log("I am in login function before");
    //     this.getAllLogins().then(data => {console.log('I am in login function from Authenticated class', this.allLogin);
    //     for(let i=0; i<this.allLogin.length; i++) {
    //         if(this.allLogin[i].pseudo === pseudo && this.allLogin[i].password === pwd) {
    //             this.isAuthenticated = true;
    //             console.log('authenticated ===', this.isAuthenticated);
    //         }

    //     }
    //     console.log('authenticated ===', this.isAuthenticated);
    //     // return new Promise(resolve => {resolve(this.isAuthenticated)})
    //     return this.isAuthenticated;
    //                                      })
    //                       .catch(err => { /*...handle the error...*/});
    // }
    static async verifyLogin(pseudo: string, pwd: string): Promise<boolean> {
        // return true;
        let result = await this.getAllLogins();
        for(let i=0; i<this.allLogin.length; i++) {
                    if(this.allLogin[i].pseudo === pseudo && this.allLogin[i].password === pwd) {
                        this.isAuthenticated = true;
                        console.log('authenticated ===', this.isAuthenticated);
                    }
        }
        // return result;
        return this.isAuthenticated;
        // this.getAllLogins().then(response => {console.log("in verifyLogins respose ===", response);
        //                                      return false;
        //                                      })
    }
    // static async login(pseudo: any, pwd: any) {
    //     console.log("I am in login function before");
    //     this.getAllLogins().then(data => {console.log('I am in login function from Authenticated class', this.allLogin);
    //     for(let i=0; i<this.allLogin.length; i++) {
    //         if(this.allLogin[i].pseudo === pseudo && this.allLogin[i].password === pwd) {
    //             this.isAuthenticated = true;
    //             console.log('authenticated ===', this.isAuthenticated);
    //         }

    //     }
    //     console.log('authenticated ===', this.isAuthenticated);
    //     return this.isAuthenticated
    //                                      })
    //                       .catch(err => { /*...handle the error...*/});
    // }

}





// handleSubmit = async event => {
//     event.preventDefault();
  
//     //
//     const response = await API.delete(`users/${this.state.id}`);
  
//     console.log(response);
//     console.log(response.data);
//   };

//********************************************************************************** */

// https://scotch.io/tutorials/asynchronous-javascript-using-async-await

//********************************************************************************** */

// class Example{
//     async asyncMethod() {
//       const data = await axios.get("/some_url_endpoint");
//       return data
//     }
//   }


//   const exampleClass = new Example();
//   exampleClass.asyncMethod().then(//do whatever you want with the result)  