namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string currentUsername { get; set; }
        public string Department { get; set; }
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 25;
        public string OrderBy { get; set; } = "lastActive";
    }
} 