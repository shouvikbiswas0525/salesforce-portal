const BACKEND_URL = 'http://localhost:3000';

window.onload = function()
{
    fetchUserInfo();
}


function login()
{
    window.location.href = `${BACKEND_URL}/login`;
}

function logout()
{
    window.location.href = `${BACKEND_URL}/logout`;
}

async function fetchUserInfo() 
{

    try
    {
        const response = await fetch(`${BACKEND_URL}/api/userinfo`, {
            credentials: 'include'
          });
    
    
        if (response.status === 401) 
            {
                // User not logged in - show login button
                showSection('login-section');
                return;
            }


         if (!response.ok) {
            showSection('error-section');
            return;
          }

          const data = await response.json();
          
          // Populate user information
          document.getElementById('user-name').textContent = data.name;
          document.getElementById('user-email').textContent = data.email;
          document.getElementById('user-username').textContent = data.preferred_username;
          
          // Show user section and hide login
          showSection('user-section');
    }
    
    catch (error) {
          console.error('Error fetching user info:', error);
          showSection('error-section');
        }
}

function showSection(sectionId) 
{
// Hide all sections first
document.getElementById('login-section').style.display = 'none';
document.getElementById('user-section').style.display = 'none';
document.getElementById('error-section').style.display = 'none';

// Show the requested section
document.getElementById(sectionId).style.display = 'block';
}

        
