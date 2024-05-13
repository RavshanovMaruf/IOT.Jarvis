namespace humidity.api.Entity.framework
{
    public class InformationDTO
    {
        public float Humidity { get; set; }
        public float Temperature { get; set; }
        public float WaterLevel { get; set; }
        public DateTime? Time { get; set; }
    }
}
