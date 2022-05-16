namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string currentUsername { get; set; }
        public string Department { get; set; }
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 25;
        public string OrderBy { get; set; } = "lastActive";
    }
} 