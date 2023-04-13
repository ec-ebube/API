using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;
using CBT_Backend.Repo;
using Microsoft.EntityFrameworkCore;

namespace CBT_Backend.Services
{
    public class OptionsServices : IOptions
    {
        private readonly CBT_DbContext? _cbtContext;
        public OptionsServices(CBT_DbContext? cbtContext)
        {
            _cbtContext = cbtContext;
        }

        public async Task<string> CreateOption(Options_DTO options)
        {
            try
            {
                var newOption = new Options();
                var id = Guid.NewGuid();
                newOption.Id = id.ToString();
                newOption.Option_A = options.Option_A;
                newOption.Option_B = options.Option_B;
                newOption.Option_C = options.Option_C;
                newOption.Option_D = options.Option_D;
                newOption.Answer = options.Answer;
                newOption.Created_at = DateTime.Now;
                newOption.Updated_at = DateTime.Now;

                var opt = await _cbtContext!.Options.AddAsync(newOption);
                if (opt == null)
                {
                    throw new Exception("Not Created");
                }
                await _cbtContext!.Options.AddAsync(newOption);
                await _cbtContext.SaveChangesAsync();
                return "Options Created";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteOption(string id)
        {
            try
            {
                var opt = await _cbtContext!.Options.FindAsync(id);
                if (opt == null)
                {
                    throw new Exception("Option not Avaliable");
                }
                _cbtContext.Remove(opt);
                return "Deleted Successfully";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<Options> GetOption(string id)
        {
            try
            {
                var opt = await _cbtContext!.Options.Where(o => o.Id == id).FirstOrDefaultAsync();
                if (opt == null)
                {
                    return null!;
                }
                return opt!;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var err = new {ex.Message};
                return null!;
            }
        }

        public async Task<IEnumerable<Options>> GetOptions()
        {
            try
            {
                var option = await _cbtContext!.Options.OrderBy(x => x.Created_at).ToListAsync();
                if (option.Count == 0)
                {
                    return null!;
                }
                return option;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                var errList = new List<Options>();
                return errList;
            }
        }

        public async Task<string> UpdateOption(string id, Options_DTO options)
        {
            try
            {
                var editOption = await _cbtContext!.Options.FindAsync(id);
                if (editOption == null)
                {
                    return null!;
                }
                editOption.Option_A = options.Option_A;
                editOption.Option_B = options.Option_B;
                editOption.Option_C = options.Option_C;
                editOption.Option_D = options.Option_D;
                editOption.Answer = options.Answer;
                editOption.Updated_at = DateTime.Now;
                _cbtContext!.Options.Attach(editOption);
                _cbtContext.SaveChanges();
                return "Successful";

            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }
    }
}