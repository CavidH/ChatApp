namespace ChatApp.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}