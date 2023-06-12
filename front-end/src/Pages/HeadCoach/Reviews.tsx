import { Avatar, Card, Space, Divider, Rate, message, Spin } from "antd";
import { useEffect, useState } from "react";
import Email from "../../components/Messages/Email";
import "./Review.css";
import newRequest from "../../Utils/newRequest";

interface review {
  gigId: string;
  reviewerName: string;
  userId: string;
  star: number;
  des: string;
}

interface prop {
  coachId: string;
}

const Reviews: React.FC<prop> = ({ coachId }) => {
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [reviews, setReviews] = useState<review[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsloading(true);

      const getReview = async () => {
        const res = await newRequest.get(`/reviews/all/${coachId}`, {});
        console.log(res.data);
        setReviews(res.data);
      };

      getReview();
      setIsloading(false);
    } catch (err: any) {
      message.error(err.message);
      setIsloading(false);
    }
  }, []);

  const [emailForEmail, setEmailForEmail] = useState<string>("");
  const [users, setUsers] = useState<review[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
    <div>
      <Spin spinning={isLoading}>
        {reviews === null && <div>No reviews yet</div>}
        <Card
          hoverable
          style={{ width: "100%", marginTop: "5px", background: "#e9ecef" }}
        >
          {reviews.map((review, index) => (
            <div>
              <Space direction="vertical">
                <Space>
                  <span
                    style={{ color: "red" }}
                    className="userName"
                    onClick={() => {
                      window.alert("Open user profile");
                    }}
                  >
                    {review.reviewerName}
                  </span>
                  <span>
                    {" "}
                    <Rate allowHalf value={review.star} disabled />
                  </span>
                </Space>
              </Space>
              <div>
                <span>{review.des}</span>
              </div>
              <Divider />
            </div>
          ))}
        </Card>

        <Email setIsOpen={setIsOpen} isOpen={isOpen} email={emailForEmail} />
      </Spin>
    </div>
  );
};

export default Reviews;
