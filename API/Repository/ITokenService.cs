using API.Entities;

namespace API.Repository
{
    public interface ITokenService
    {
        public string BuildToken(AppUser user);
    }
}
