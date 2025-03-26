export const baseUrl = 'https://poledataapp.com/api';
export const emailAdm1 = 'g.gulov+adm1@gmail.com';
export const passwordAdm1 = 'Helloadm1';
function loginAndGetAuthDetails() {
    const loginPayload = JSON.stringify({
      email: emailAdm1,
      password: passwordAdm1,
      device: 'Unknown',
      remember: true,
      with_cookie: false,
    });
  
    const loginResponse = http.post(`${BASE_URL}/login`, loginPayload, {
      headers: { 'Content-Type': 'application/json' },
    });
  
    check(loginResponse, {
      'login succeeded': (res) => res.status === 200 && res.json('token'),
      'company ID exists': (res) => res.json('user.roles[0].company.id') !== undefined,
    });
  
    const responseBody = loginResponse.json();
  
    return {
      token: responseBody.token,
      companyId: responseBody.user?.roles?.[0]?.company?.id,
    };
  }