"use client";

import { useMemo, useState } from "react";
import { usePublishedArticles } from "@/hooks/useApi";

interface Props {
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ViewBlogsTab({
  onEdit,
  onView,
  onDelete,
}: Props) {
  const { data, isLoading } = usePublishedArticles();
  const articles = data?.articles ?? [];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return articles.filter((article: any) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" || article.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [articles, search, status]);

  return (
    <div className="page">

      <div className="pageHeader">
        <div>
          <h2>View Blogs</h2>
          <p>Manage all published and draft articles.</p>
        </div>

        <button className="primaryBtn">
          + Add New Blog
        </button>
      </div>

      <div className="toolbar">

        <input
          className="search"
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

      </div>

      <div className="card">

        {isLoading ? (
          <div className="loading">
            Loading Blogs...
          </div>
        ) : (
          <table>

            <thead>

              <tr>
                <th>Cover</th>
                <th>Blog</th>
                <th>Status</th>
                <th>Date</th>
                <th align="center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((article: any) => (

                <tr key={article.id}>

                  <td width="110">

                    <img
                      src={article.coverImage}
                      className="cover"
                    />

                  </td>

                  <td>

                    <h4>{article.title}</h4>

                    <p>{article.category?.name}</p>

                  </td>

                  <td>

                    <span
                      className={`badge ${
                        article.status === "PUBLISHED"
                          ? "published"
                          : "draft"
                      }`}
                    >
                      {article.status}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="actions">

                      <button
                        className="view"
                        onClick={() => onView?.(article.id)}
                      >
                        👁
                      </button>

                      <button
                        className="edit"
                        onClick={() => onEdit?.(article.id)}
                      >
                        ✏
                      </button>

                      <button
                        className="delete"
                        onClick={() => onDelete?.(article.id)}
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      <style jsx>{`
        .page {
          padding: 28px;
        }

        .pageHeader {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:24px;
        }

        h2{
          margin:0;
          color:#0D1B2A;
        }

        p{
          color:#777;
          margin-top:6px;
        }

        .primaryBtn{
          background:#C9A84C;
          color:#0D1B2A;
          border:none;
          padding:11px 20px;
          border-radius:6px;
          cursor:pointer;
          font-weight:600;
        }

        .toolbar{
          display:flex;
          gap:12px;
          margin-bottom:20px;
        }

        .search{
          flex:1;
          padding:11px;
          border:1px solid #ddd;
          border-radius:6px;
        }

        .filter{
          width:180px;
          border:1px solid #ddd;
          border-radius:6px;
          padding:10px;
        }

        .card{
          background:#fff;
          border-radius:10px;
          box-shadow:0 2px 12px rgba(0,0,0,.06);
          overflow:hidden;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th{
          background:#faf7f2;
          padding:14px;
          text-align:left;
          font-size:12px;
          color:#666;
        }

        td{
          padding:14px;
          border-top:1px solid #eee;
          vertical-align:middle;
        }

        .cover{
          width:90px;
          height:60px;
          border-radius:6px;
          object-fit:cover;
        }

        h4{
          margin:0;
          color:#0D1B2A;
        }

        .badge{
          padding:5px 12px;
          border-radius:20px;
          font-size:12px;
          font-weight:600;
        }

        .published{
          background:#EAF8EF;
          color:#128A3D;
        }

        .draft{
          background:#FFF5E5;
          color:#D97706;
        }

        .actions{
          display:flex;
          justify-content:center;
          gap:10px;
        }

        .actions button{
          width:36px;
          height:36px;
          border:none;
          border-radius:6px;
          cursor:pointer;
          font-size:16px;
        }

        .view{
          background:#EEF5FF;
        }

        .edit{
          background:#FFF6DB;
        }

        .delete{
          background:#FFECEC;
        }

        .loading{
          padding:40px;
          text-align:center;
        }
      `}</style>

    </div>
  );
}
