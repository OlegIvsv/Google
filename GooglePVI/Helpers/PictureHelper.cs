namespace GooglePVI.Helpers
{
    public class PictureHelper
    {
        public byte[] ToByteArray(IFormFile picture)
        {
            if (picture == null)
                 throw new ArgumentNullException("Null-picture!!!");
            var pictureBytes = new byte[picture.Length];
            using (MemoryStream memoryStream = new MemoryStream())
            {
                picture.CopyTo(memoryStream);
                pictureBytes = memoryStream.ToArray();
            }
            return pictureBytes;
        }
    }
}
