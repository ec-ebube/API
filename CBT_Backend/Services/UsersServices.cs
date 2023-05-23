using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CBT_Backend.Models;
using CBT_Backend.DTO;
using CBT_Backend.Repo;

namespace CBT_Backend.Services
{
    public class UsersServices : IUsers
    {
        private readonly CBT_DbContext? _cbtContext;
        public UsersServices(CBT_DbContext? cbtContext)
        {
            _cbtContext = cbtContext;
        }

        public async Task<string> CreateUser(Users_DTO users)
        {
            try
            {
                var newUser = new Users();
                newUser.FirstName = users.FirstName;
                newUser.LastName = users.LastName;
                newUser.Email = users.Email;
                newUser.PhoneNumber = users.PhoneNumber;
                newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(users.Password);
                newUser.Created_at = DateTime.Now;
                newUser.Updated_at = DateTime.Now;
                if (users.Role == null)
                {
                    newUser.Role = "User";
                }
                else
                {
                    newUser.Role = users.Role;
                }
                var use = await _cbtContext!.Users.AddAsync(newUser);
                if (use == null)
                {
                    return "Somthing went wrong";
                }
                // await _cbtContext!.Users.AddAsync(newUser);
                await _cbtContext.SaveChangesAsync();
                return "User Created";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteUser(string id)
        {
            try
            {
                var users = await _cbtContext!.Users.FindAsync(id);
                if (users == null)
                {
                    throw new Exception("User not found");
                }
                _cbtContext.Remove(users);
                _cbtContext.SaveChanges();
                return "Deleted Successfully";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<Users> GetUser(string id)
        {
            try
            {
                var users =  _cbtContext!.Users.Where(u => u.Id == id)
                .Include(c => c.Course);
                if (users == null)
                {
                    return null!;
                }
                var allUsers = await users!.ThenInclude(a => a.Assessments)
                .FirstOrDefaultAsync();
                
                return allUsers!;
            }
            catch (System.Exception ex)
            {
               Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<IEnumerable<Users>> GetUsers()
        {
            try
            {
                var users = await _cbtContext!.Users.OrderByDescending(x => x.Created_at).Include(c => c.Course).ToListAsync();
                if (users.Count == 0)
                {
                    return null!;
                }
                return users;
            }
            catch (System.Exception ex)
            {
               Console.WriteLine(ex.Message);
                var errList = new List<Users>();
                return errList;
            }
        }

        public async Task<string> UpdateUser(string id, Users_DTO users)
        {
            try
            {
                var editUser = await _cbtContext!.Users.FindAsync(id);
                if (editUser == null)
                {
                    return null!;
                }
                editUser.FirstName = users.FirstName;
                editUser.LastName = users.LastName;
                editUser.Email = users.Email;
                editUser.PhoneNumber = users.PhoneNumber;
                editUser.Role = users.Role;
                editUser.Updated_at = DateTime.Now;
                _cbtContext.Users.Attach(editUser);
                _cbtContext.SaveChanges();
                return "Successful";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }
    }
}