namespace humidity.api.Entity.framework
{
    public class Information
    {
        public int Id { get; set; }
        public float Humidity { get; set; }
        public float Temperature { get; set; }
        public float WaterLevel {  get; set; }
        public string WaterLevelCondition { get; set; }
        public bool Danger { get; set; }
        public DateTime? Time { get; set; }
    }
}
